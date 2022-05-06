import { EntityRepository, Repository } from 'typeorm';
import { MeetingUserDetail } from '../entities/meeting-user-detail.entity';

@EntityRepository(MeetingUserDetail)
export class MeetingDetailRepository extends Repository<MeetingUserDetail> {
  getMeetingValueSumByMeetingUserId(
    id: number,
    startDate: Date,
    endDate: Date,
  ) {
    return this.createQueryBuilder('meeting_user_detail')
      .select('sum(value) as sum_value')
      .where(
        `date BETWEEN '${startDate.toISOString()}' AND '${endDate.toISOString()}'`,
      )
      .andWhere('meeting_user_id = :id', { id })
      .groupBy('meeting_user_id')
      .getRawOne();
  }
}
