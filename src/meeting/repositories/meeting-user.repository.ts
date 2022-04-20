import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/repositories/user.repository';
import { EntityRepository, Repository } from 'typeorm';
import { MeetingUser } from '../entities/meeting-user.entity';

@EntityRepository(MeetingUser)
export class MeetingUserRepository extends Repository<MeetingUser> {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super();
  }

  async getMeetingUserByMeetingId(id: number) {
    return this.createQueryBuilder('meeting_user')
      .where('meeting_user.meeting_id = :meeting_id', {
        meeting_id: id,
      })
      .getManyAndCount();
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
}
