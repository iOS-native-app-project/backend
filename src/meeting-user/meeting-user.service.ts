import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, TransactionManager } from 'typeorm';
import { MeetingUser } from './entities/meeting-user.entity';
import { MeetingUserRepository } from './repositories/meeting-user.repository';

@Injectable()
export class MeetingUserService {
  constructor(
    @InjectRepository(MeetingUserRepository)
    private meetingUserRepository: MeetingUserRepository,
  ) {}

  // 모임 참여
  async joinMeeting(
    userId: number,
    meetingId: number,
    @TransactionManager() transactionManager?: EntityManager,
  ): Promise<MeetingUser | string> {
    return await this.meetingUserRepository.joinMeeting(
      userId,
      meetingId,
      transactionManager ?? null,
    );
  }

  // 추천 신고 API
  // 0: recommand, 1: report
  async setUserforReport(
    meetingId: number,
    userId: number,
    type: number,
  ): Promise<boolean> {
    const member = await this.getMeetingByUserIdAndMeetingId(meetingId, userId);
    if (!member) throw new NotFoundException('해당 멤버를 찾을 수 없습니다.');

    return await await this.meetingUserRepository.setUserforReport(
      type,
      member,
    );
  }

  async getMeetingByUserId(userId: number) {
    return await this.meetingUserRepository.getMeetingByUserId(userId);
  }

  async getMemberCount(meetingId: number) {
    return await this.meetingUserRepository.count({ meetingId });
  }

  async getMeetingByUserIdAndMeetingId(id: number, userId: number) {
    return await this.meetingUserRepository.getMeetingByUserIdAndMeetingId(
      userId,
      id,
    );
  }

  async getMeetingUserByMeetingId(id: number) {
    return await this.meetingUserRepository.getMeetingUserByMeetingId(id);
  }
}
