import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, In, Repository } from 'typeorm';
import { SearchMeetingOutput } from './dto/search-meeting.dto';
import { MeetingUser } from './entities/meeting-user.entity';
import { Meeting } from './entities/meeting.entity';

@Injectable()
export class MeetingService {
  constructor(
    @InjectConnection()
    private connection: Connection,
    @InjectRepository(Meeting)
    private meetingRepository: Repository<Meeting>,
    @InjectRepository(MeetingUser)
    private meetingUserRepository: Repository<MeetingUser>,
  ) {}

  // 모임 첫 화면
  async getMeeting(
    user_id: number,
    pageNo = 1,
    pageSize = 10,
  ): Promise<SearchMeetingOutput> {
    const meetingInfo = await this.meetingRepository.find({
      skip: (pageNo - 1) * pageSize,
      take: pageSize,
      order: {
        createdAt: 'DESC',
      },
      join: {
        alias: 'meeting_user',
      },
    });

    if (meetingInfo.length === 0) {
      return {
        status: 'SUCCESS',
        code: 200,
        msg: '검색 결과가 없습니다.',
      };
    }

    const myMeeting = await this.getMeetingByUserId(user_id);
    console.log(myMeeting);

    if (myMeeting) {
      // console.log(myMeeting.data.meeting_id);
    }

    meetingInfo.forEach((element) => {
      element['status'] = true;
    });

    return {
      status: 'SUCCESS',
      code: 200,
      data: meetingInfo,
    };
  }

  // 카테고리 필터 검색
  async getMeetingByCategory(
    category_id: number[],
    user_id: number,
    pageNo = 1,
    pageSize = 10,
  ) {
    const meetingInfo = await this.meetingRepository.find({
      skip: (pageNo - 1) * pageSize,
      take: pageSize,
      where: {
        category_id: In(category_id),
      },
    });

    if (meetingInfo.length === 0) {
      return {
        status: 'SUCCESS',
        code: 200,
        msg: '검색 결과가 없습니다.',
      };
    }

    return {
      status: 'SUCCESS',
      code: 200,
      data: meetingInfo,
    };
  }

  // 검색어로 검색 (모임명,한줄소개)
  // TODO : user 추가
  async getMeetingBySearch(
    search: string,
    user_id: number,
    pageNo = 1,
    pageSize = 10,
  ) {
    const meetingInfo = await this.meetingRepository
      .createQueryBuilder('meeting')
      .where('meeting.name like :name', { name: '%' + search + '%' })
      .orWhere('meeting.descript like :descript', {
        descript: '%' + search + '%',
      })
      .skip(pageNo)
      .take(pageSize)
      .getMany();

    if (meetingInfo.length === 0) {
      return {
        status: 'SUCCESS',
        code: 200,
        msg: '검색 결과가 없습니다.',
      };
    }

    return {
      status: 'SUCCESS',
      code: 200,
      data: meetingInfo,
    };
  }

  // 내 모임 검색
  async getMeetingByUserId(user_id: number) {
    const meetingInfo = await this.connection.query(
      `select * from meeting m left outer join meeting_user m_user 
      on m_user.meeting_id = m.id where m_user.user_id = ?`,
      [user_id],
    );

    if (meetingInfo.length === 0) {
      return {
        status: 'SUCCESS',
        code: 200,
        msg: '검색 결과가 없습니다.',
      };
    }

    return {
      status: 'SUCCESS',
      code: 200,
      data: meetingInfo,
    };
  }
}
