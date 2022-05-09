import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { checkDateFormat } from 'src/common/utility/check-format';
import { UpdateResult } from 'typeorm';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { MeetingUser } from './entities/meeting-user.entity';
import { Meeting } from './entities/meeting.entity';
import { MeetingDetailRepository } from './repositories/meeting-detail.repository';
import { MeetingUserRepository } from './repositories/meeting-user.repository';
import { MeetingRepository } from './repositories/meeting.repository';

@Injectable()
export class MeetingService {
  constructor(
    @InjectRepository(MeetingRepository)
    private meetingRepository: MeetingRepository,
    @InjectRepository(MeetingUserRepository)
    private meetingUserRepository: MeetingUserRepository,
    @InjectRepository(MeetingDetailRepository)
    private meetingDetailRepository: MeetingDetailRepository,
  ) {}

  // 모임 첫 화면
  async getMeeting(userId: number): Promise<Meeting[] | string> {
    const meetingInfo = await this.meetingRepository.find();

    if (meetingInfo.length === 0) {
      return '검색 결과가 없습니다.';
    }
    return await this.setJoinData(userId, meetingInfo);
  }

  // 카테고리 필터 검색
  async getMeetingByCategory(
    categoryId: number[],
    userId: number,
  ): Promise<Meeting[] | string> {
    const meetingInfo = await this.meetingRepository.getMeetingByCategory(
      categoryId,
    );

    if (meetingInfo.length === 0) {
      return '검색 결과가 없습니다.';
    }
    return await this.setJoinData(userId, meetingInfo);
  }

  // 검색어로 검색 (모임명,한줄소개)
  async getMeetingBySearch(
    search: string,
    userId: number,
  ): Promise<Meeting[] | string> {
    const meetingInfo = await this.meetingRepository.getMeetingBySearch(search);

    if (meetingInfo.length === 0) {
      return '검색 결과가 없습니다.';
    }
    return await this.setJoinData(userId, meetingInfo);
  }

  async setJoinData(userId: number, meetingInfo: Meeting[]) {
    const myMeeting = await this.meetingUserRepository.getMeetingByUserId(
      userId,
    );

    if (myMeeting) {
      meetingInfo.forEach((element) => {
        for (let i = 0; i < myMeeting.length; i++) {
          if (element.id == myMeeting[i].meetingId) {
            element['join'] = true;
            break;
          }
        }
      });
    }
    return meetingInfo;
  }

  // 모임 입장
  async getMeetingById(meetingId: number) {
    const meetingUser = await this.meetingUserRepository.count({ meetingId });
    const meetingData = await this.meetingRepository.getMeeting(meetingId);

    return {
      ...meetingData,
      totalMember: meetingUser,
    };
  }

  // 모임 홈
  // 멤버 프로필사진, 닉네임, 달성률, 추천, 신고
  async getMeetingHome(id: number) {
    const meeting = await this.meetingRepository.getMeeting(id);

    const meetingUsers =
      await this.meetingUserRepository.getMeetingUserByMeetingId(id);

    // 모임 주기 계산
    const data = await this.getMeetingData(
      meeting.createdAt,
      meeting.cycle,
      meeting.round,
    );

    // 멤버별 달성률 및 순위
    const memberRate = await this.getMeetingUserRate(
      meeting.targetAmount,
      meetingUsers,
      data.startDate,
      data.endDate,
    );

    // 모임 전체 달성률
    const meetingRate = await this.getMeetingRate(
      meeting.id,
      meeting.targetAmount,
      data.startDate,
      data.endDate,
    );

    return {
      meeting,
      memberRate,
      meetingData: {
        startDate: checkDateFormat(data.startDate),
        endDate: checkDateFormat(data.endDate),
      },
    };
  }

  // 모임 주기 계산
  async getMeetingData(createdAt: Date, cycle: number, round: number) {
    const startDate = new Date(createdAt);
    const endDate = new Date(createdAt);

    if (cycle == 0) {
      startDate.setDate(startDate.getDate() + 1 * (round - 1));
      endDate.setDate(endDate.getDate() + 1 * round);
    } else if (cycle == 1) {
      startDate.setDate(startDate.getDate() + 7 * (round - 1));
      endDate.setDate(endDate.getDate() + 7 * round);
    } else {
      startDate.setDate(startDate.getDate() + 30 * (round - 1));
      endDate.setDate(endDate.getDate() + 30 * round);
    }

    return {
      startDate,
      endDate,
    };
  }

  // 멤버별 달성률 계산
  async getMeetingUserRate(
    targetAmount: number,
    meetingUsers: MeetingUser[],
    startDate: Date,
    endDate: Date,
  ) {
    // eslint-disable-next-line prefer-const
    let memberRate: { userId: number; rate: number }[] = [];
    for (const meetingUser of meetingUsers) {
      const rateData =
        await this.meetingDetailRepository.getMeetingValueSumByMeetingUserId(
          meetingUser.id,
          startDate,
          endDate,
        );

      memberRate.push({
        userId: meetingUser.userId,
        rate: rateData ? (rateData.sum_value / targetAmount) * 100 : 0,
      });
    }

    return memberRate;
  }

  // 멤버별 달성률 계산
  async getMeetingRate(
    meetinfId: number,
    targetAmount: number,
    startDate: Date,
    endDate: Date,
  ) {}

  // 추천 신고 API
  // 0: recommand, 1: report
  async setUserforReport(
    meetingId: number,
    userId: number,
    type: number,
  ): Promise<false | UpdateResult> {
    return await this.meetingUserRepository.setUserforReport(
      meetingId,
      userId,
      type,
    );
  }

  // 멤버 기록 보기
  async getMemberRecord(meetingId: number, memberId: number) {
    return {
      status: 'SUCCESS',
      code: 200,
    };
  }

  // 모임 개설
  // todo transaction 처리
  async createMeeting(
    userId: number,
    createMeetingDto: CreateMeetingDto,
  ): Promise<Meeting> {
    try {
      const meeting = await this.meetingRepository.createMeeting(
        userId,
        createMeetingDto,
      );
      const meetingUser = await this.joinMeeting(userId, meeting.id);

      if (meetingUser) {
        return meeting;
      }
    } catch (error) {
      throw new HttpException(
        {
          error: error,
          message: '모임 개설 실패',
        },
        500,
      );
    }
  }

  // 모임 참여
  // todo 이미 참여 되있을 경우 메세지 출력
  async joinMeeting(userId: number, meetingId: number): Promise<MeetingUser> {
    return await this.meetingUserRepository.joinMeeting(userId, meetingId);
  }
}
