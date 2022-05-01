import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult } from 'typeorm';
import { CreateMeetingDetailDto } from './dto/create-meeting-detail.dto';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { MeetingUserDetail } from './entities/meeting-user-detail.entity';
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
    const meetingData = await this.meetingRepository.getMeeting(id);
    console.log(meetingData);

    const meetingUser =
      await this.meetingUserRepository.getMeetingUserByMeetingId(id);
    console.log(meetingUser);

    // 멤버별 달성률 및 순위

    // 모임 전체 달성률

    return {
      meetingData: meetingData,
    };
  }

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
  async joinMeeting(userId: number, meetingId: number): Promise<MeetingUser> {
    return await this.meetingUserRepository.joinMeeting(userId, meetingId);
  }

  // 모임 기록하기
  async createMeetingDetail(
    createMeetingDetailDto: CreateMeetingDetailDto,
  ): Promise<MeetingUserDetail> {
    return await this.meetingDetailRepository.createMeetingDetail(
      createMeetingDetailDto,
    );
  }
}
