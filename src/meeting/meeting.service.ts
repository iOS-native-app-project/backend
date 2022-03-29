import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meeting } from './entities/meeting.entity';

@Injectable()
export class MeetingService {
  constructor(
    @InjectRepository(Meeting)
    private meetingRepository: Repository<Meeting>,
  ) { }

  // 카테고리로 검색
  async getMeetingByCategory(category_id: number) {
    const meetingInfo = await this.meetingRepository.findOneOrFail({ category_id });
    return meetingInfo;
  }

  // 검색어로 검색
  async getMeeting(search: string) {
    const meetingInfo = await this.meetingRepository.createQueryBuilder('meeting').select()
    return meetingInfo;
  }
}
