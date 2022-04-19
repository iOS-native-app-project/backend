import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from 'src/category/repositories/category.repository';
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
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
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
    const myMeeting = await this.meetingRepository.getMeetingByUserId(user_id);

    if (myMeeting) {
      meetingInfo.forEach((element) => {
        for (let i = 0; i < myMeeting.length; i++) {
          if (element.id == myMeeting[i].meeting_id) {
            element['join'] = false;
            break;
          }
        }
      });
    }
    return meetingInfo;
  }

  // 모임 입장
  async getMeetingById(meeting_id: number) {
    const member = await this.meetingUserRepository.getMeetingUserByMeetingId(
      meeting_id,
    );
    const meetingData = await this.meetingRepository.getMeetingById(meeting_id);
    const categoryName = await this.categoryRepository.getCategoryById(
      meetingData.category_id,
    );

    return {
      status: 'SUCCESS',
      code: 200,
      data: {
        ...meetingData,
        categoryName: categoryName.name,
        totalMember: member,
      },
    };
  }

  // 모임 홈
  // 모임 목표 (주기, 목표치, 단위, 카테고리)
  // deadline이 있어야 목표 달성치 평균을 낼수있음
  // 멤버 프로필사진, 닉네임, 달성율, 추천, 신고
  async getMeetingHome(meeting_id: number) {
    const meetingData = await this.meetingRepository.getMeetingById(meeting_id);
    const categoryName = await this.categoryRepository.getCategoryById(
      meetingData.category_id,
    );

    return {
      status: 'SUCCESS',
      code: 200,
      data: {
        ...meetingData,
        categoryName: categoryName.name,
      },
    };
  }
}
