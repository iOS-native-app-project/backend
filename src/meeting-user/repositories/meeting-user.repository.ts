import {
  EntityManager,
  EntityRepository,
  Repository,
  TransactionManager,
} from 'typeorm';
import { MeetingUser } from '../entities/meeting-user.entity';

@EntityRepository(MeetingUser)
export class MeetingUserRepository extends Repository<MeetingUser> {
  async getMeetingUserById(id: number) {
    return await this.createQueryBuilder('meeting_user')
      .select(['user_id'])
      .where('meeting_user.id = :id', { id })
      .getRawOne();
  }

  async getMeetingUserByMeetingId(id: number) {
    return await this.createQueryBuilder('meeting_user')
      .leftJoinAndSelect('meeting_user.users', 'user')
      .where('meeting_user.meetingId = :id', { id })
      .getMany();
  }

  async getMeetingByUserId(userId: number) {
    return await this.createQueryBuilder('meeting_user')
      .select(['meeting.*'])
      .leftJoin('meeting_user.meetings', 'meeting')
      .where('meeting_user.userId = :userId', { userId })
      .getRawMany();
  }

  async getMeetingNonUserId(userId: number) {
    return await this.createQueryBuilder('meeting_user')
      .leftJoinAndSelect('meeting_user.meetings', 'meeting')
      .where('meeting_user.userId != :userId', { userId })
      .getMany();
  }

  async getMeetingByUserIdAndMeetingId(meetingId: number, userId: number) {
    return await this.createQueryBuilder('meeting_user')
      .where('meeting_user.meetingId = :meetingId', { meetingId })
      .andWhere('meeting_user.userId = :userId', { userId })
      .getOne();
  }

  async setUserforReport(type: number, member: MeetingUser) {
    try {
      if (type && type == 1) {
        await this.update(member.id, { report: member.report + 1 });
      } else await this.update(member.id, { recommand: member.recommand + 1 });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async joinMeeting(
    userId: number,
    meetingId: number,
    @TransactionManager() transactionManager?: EntityManager,
  ) {
    if (!transactionManager) {
      const user = await this.getMeetingByUserIdAndMeetingId(meetingId, userId);
      if (user) return '이미 참여중인 모임입니다.';
      return this.save(
        this.create({
          meetingId,
          userId,
        }),
      );
    }
    return transactionManager.save(
      transactionManager.create(MeetingUser, {
        meetingId,
        userId,
      }),
    );
  }
}
