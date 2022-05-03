import { EntityRepository, Repository } from 'typeorm';
import { Record } from '../entities/record.entity';

@EntityRepository(Record)
export class RecordRepository extends Repository<Record> {
  async findAll(meetingId: number, meetingUserId: number) {
    return await this.createQueryBuilder('record')
      .where('meeting_user_id = :meetingUserId and meeting_id = :meetingId', {
        meetingUserId,
        meetingId,
      })
      .getMany();
  }
}
