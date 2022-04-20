import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MeetingDetailRepository } from './repositories/meeting-detail.repository';

@Injectable()
export class MeetingDetailService {
  constructor(
    @InjectRepository(MeetingDetailRepository)
    private meetingDetailRepository: MeetingDetailRepository,
  ) {}

  // 멤버 기록 보기
  async getMemberRecord(meeting_id: number, member_id: number) {
    return {
      status: 'SUCCESS',
      code: 200,
    };
  }
}
