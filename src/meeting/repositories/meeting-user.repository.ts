import { EntityRepository, Repository } from 'typeorm';
import { MeetingUser } from '../entities/meeting-user.entity';

@EntityRepository(MeetingUser)
export class MeetingUserRepository extends Repository<MeetingUser> {
  async getMeetingUserByMeetingId(id: number) {
    return await this.createQueryBuilder('meeting_user')
      .select([
        'user.id as user_id',
        'user.nickname',
        'user.image_path',
        'meeting_user.recommand',
        'meeting_user.report',
      ])
      .leftJoinAndSelect('meeting_user.users', 'user')
      .where('meeting_user.meeting_id = :id', { id })
      .getOne();
  }

  async getMeetingByUserId(user_id: number) {
    return await this.createQueryBuilder('meeting_user')
      .leftJoinAndSelect('meeting_user.meetings', 'meeting')
      .where('meeting_user.user_id = :user_id', { user_id })
      .getMany();
  }

  async setUserforReport(meeting_id: number, member_id: number, type: number) {
    try {
      const user = await this.createQueryBuilder('meeting_user')
        .where('meeting_user.meeting_id = :meeting_id', { meeting_id })
        .andWhere('meeting_user.user_id = :member_id', { member_id })
        .getOne();

      if (type && type == 1) {
        return this.update(user.id, { report: user.report + 1 });
      } else return this.update(user.id, { recommand: user.recommand + 1 });
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async joinMeeting(user_id: number, meeting_id: number) {
    const meetingUser = this.create({ meeting_id, user_id });
    return this.save(meetingUser);
  }
}
