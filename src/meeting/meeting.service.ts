import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreOutput } from 'src/common/dto/core.dto';
import {
  CreateMeetingDto,
  CreateMeetingOutput,
} from './dto/create-meeting.dto';
import { SearchMeetingOutput } from './dto/search-meeting.dto';
import { Meeting } from './entities/meeting.entity';
import { MeetingUserRepository } from './repositories/meeting-user.repository';
import { MeetingRepository } from './repositories/meeting.repository';

@Injectable()
export class MeetingService {
  constructor(
    @InjectRepository(MeetingRepository)
    private meetingRepository: MeetingRepository,
    @InjectRepository(MeetingUserRepository)
    private meetingUserRepository: MeetingUserRepository,
  ) {}

  // 모임 첫 화면
  async getMeeting(user_id: number): Promise<SearchMeetingOutput> {
    const meetingInfo = await this.meetingRepository.find();

    if (meetingInfo.length === 0) {
      return {
        status: 'SUCCESS',
        code: 200,
        msg: '검색 결과가 없습니다.',
      };
    }
    const meetingData = await this.setJoinData(user_id, meetingInfo);

    return {
      status: 'SUCCESS',
      code: 200,
      data: meetingData,
    };
  }

  // 카테고리 필터 검색
  async getMeetingByCategory(
    category_id: number[],
    user_id: number,
  ): Promise<SearchMeetingOutput> {
    const meetingInfo = await this.meetingRepository.getMeetingByCategory(
      category_id,
    );

    if (meetingInfo.length === 0) {
      return {
        status: 'SUCCESS',
        code: 200,
        msg: '검색 결과가 없습니다.',
      };
    }

    const meetingData = await this.setJoinData(user_id, meetingInfo);

    return {
      status: 'SUCCESS',
      code: 200,
      data: meetingData,
    };
  }

  // 검색어로 검색 (모임명,한줄소개)
  async getMeetingBySearch(
    search: string,
    user_id: number,
  ): Promise<SearchMeetingOutput> {
    const meetingInfo = await this.meetingRepository.getMeetingBySearch(search);

    if (meetingInfo.length === 0) {
      return {
        status: 'SUCCESS',
        code: 200,
        msg: '검색 결과가 없습니다.',
      };
    }

    const meetingData = await this.setJoinData(user_id, meetingInfo);

    return {
      status: 'SUCCESS',
      code: 200,
      data: meetingData,
    };
  }

  async setJoinData(user_id: number, meetingInfo: Meeting[]) {
    const myMeeting = await this.meetingUserRepository.getMeetingByUserId(
      user_id,
    );

    if (myMeeting) {
      meetingInfo.forEach((element) => {
        for (let i = 0; i < myMeeting.length; i++) {
          if (element.id == myMeeting[i].meeting_id) {
            element['join'] = true;
            break;
          }
        }
      });
    }
    return meetingInfo;
  }

  // 모임 입장
  async getMeetingById(id: number) {
    const meetingUser = await this.meetingUserRepository.count({
      meeting_id: id,
    });
    const meetingData = await this.meetingRepository.getMeeting(id);

    return {
      status: 'SUCCESS',
      code: 200,
      data: {
        ...meetingData,
        totalMember: meetingUser,
      },
    };
  }

  // 모임 홈
  // todo : deadline이 있어야 목표 달성치 평균을 낼수있음
  // 멤버 프로필사진, 닉네임, 달성율, 추천, 신고
  async getMeetingHome(id: number) {
    const meetingData = await this.meetingRepository.getMeeting(id);

    const meetingUser =
      await this.meetingUserRepository.getMeetingUserByMeetingId(id);
    console.log(meetingUser);

    return {
      status: 'SUCCESS',
      code: 200,
      data: {
        meetingData: meetingData,
      },
    };
  }

  // 추천 신고 API
  // 0: recommand, 1: report
  async setUserforReport(
    meeting_id: number,
    member_id: number,
    type: number,
  ): Promise<CoreOutput> {
    const user = await this.meetingUserRepository.setUserforReport(
      meeting_id,
      member_id,
      type,
    );

    if (user) {
      return {
        status: 'SUCCESS',
        code: 200,
      };
    }
    return {
      status: 'FAIL',
      code: 500,
    };
  }

  // 멤버 기록 보기
  async getMemberRecord(meeting_id: number, member_id: number) {
    return {
      status: 'SUCCESS',
      code: 200,
    };
  }

  // 모임 개설
  async createMeeting(
    user_id: number,
    createMeetingDto: CreateMeetingDto,
  ): Promise<CreateMeetingOutput> {
    const meeting = await this.meetingRepository.createMeeting(
      user_id,
      createMeetingDto,
    );
    const meetingUser = await this.joinMeeting(user_id, meeting.id);

    if (meetingUser) {
      return {
        status: 'SUCCESS',
        code: 200,
        data: meeting,
      };
    }
    return {
      status: 'FAIL',
      code: 500,
    };
  }

  // 모임 참여
  async joinMeeting(user_id: number, meeting_id: number) {
    return await this.meetingUserRepository.joinMeeting(user_id, meeting_id);
  }
}
