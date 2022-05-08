import { EntityRepository, Repository } from 'typeorm';
import { MeetingUser } from '../entities/meeting-user.entity';

@EntityRepository(MeetingUser)
export class MeetingUserRepository extends Repository<MeetingUser> {
  async getMeetingUserByMeetingId(id: number) {
    return await this.createQueryBuilder('meeting_user')
      .select([
        'user.id as userId',
        'user.nickname',
        'user.imagePath',
        'meeting_user.recommand',
        'meeting_user.report',
      ])
      .leftJoinAndSelect('meeting_user.users', 'user')
      .where('meeting_user.meetingId = :id', { id })
      .getOne();
  }

  async getMeetingByUserId(userId: number) {
    return await this.createQueryBuilder('meeting_user')
      .leftJoinAndSelect('meeting_user.meetings', 'meeting')
      .where('meeting_user.userId = :userId', { userId })
      .getMany();
  }

  async getMeetingByUserIdAndMeetingId(userId: number, meetingId: number) {
    return await this.createQueryBuilder('meeting_user')
      .where('meeting_user.user_id = :userId and meeting_id = :meetingId', {
        userId,
        meetingId,
      })
      .getOne();
  }

  async setUserforReport(meetingId: number, userId: number, type: number) {
    try {
      const user = await this.createQueryBuilder('meeting_user')
        .where('meeting_user.meetingId = :meetingId', { meetingId })
        .andWhere('meeting_user.userId = :userId', { userId })
        .getOne();

      if (type && type == 1) {
        return this.update(user.id, { report: user.report + 1 });
      } else return this.update(user.id, { recommand: user.recommand + 1 });
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async joinMeeting(userId: number, meetingId: number) {
    const meetingUser = this.create({ meetingId, userId });
    return this.save(meetingUser);
  }
}
