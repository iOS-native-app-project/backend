import { EntityRepository, Repository } from 'typeorm';
import { Record } from '../entities/record.entity';

@EntityRepository(Record)
export class RecordRepository extends Repository<Record> {
  async findAll(meetingId: number, userId: number) {
    return await this.createQueryBuilder('user')
      .where('user.id = :userId and metting.id = :meetingId', {
        userId,
        meetingId,
      })
      .getMany();
  }

  async findById(id: number, meetingId: number, userId: number) {
    return await this.createQueryBuilder('user')
      .where('user.id = :userId and metting.id = :meetingId and id = :id', {
        userId,
        meetingId,
        id,
      })
      .getOne();
  }
}
