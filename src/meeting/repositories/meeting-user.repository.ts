import { InjectConnection } from '@nestjs/typeorm';
import { Connection, EntityRepository, Repository } from 'typeorm';
import { MeetingUser } from '../entities/meeting-user.entity';

@EntityRepository(MeetingUser)
export class MeetingUserRepository extends Repository<MeetingUser> {
  async getMeetingUserByMeetingId(id: number) {
    return this.createQueryBuilder('meeting_user')
      .where('meeting_user.meeting_id = :meeting_id', {
        meeting_id: id,
      })
      .getCount();
  }
}
