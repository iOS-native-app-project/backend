import { EntityRepository, Repository } from 'typeorm';
import { CreateRecordDto } from '../dto/create-record.dto';
import { Record } from '../entities/record.entity';

@EntityRepository(Record)
export class RecordRepository extends Repository<Record> {
  async findRecords({
    meetingUserId,
    meetingId,
    year,
    month,
    date,
  }: {
    meetingUserId: number;
    meetingId?: number;
    year?: number;
    month?: number;
    userId?: number;
    date?: string;
  }): Promise<Record[]> {
    const qb = this.createQueryBuilder('record').where(
      'record.meeting_user_id = :meetingUserId',
      { meetingUserId },
    );

    if (meetingId) qb.andWhere('record.meeting_id = :meetingId', { meetingId });

    if (date) qb.andWhere('record.date = :date', { date });

    if (year && month)
      qb.andWhere('record.date like :date', {
        date: `${year}-${String(month).padStart(2, '0')}%`,
      });

    return qb.getMany();
  }

  async createSave({
    createRecordDto,
    meetingId,
    meetingUserId,
  }: {
    createRecordDto: CreateRecordDto;
    meetingId: number;
    meetingUserId: number;
  }): Promise<Record> {
    return this.save(
      this.create({
        ...createRecordDto,
        meetingId,
        meetingUserId,
      }),
    );
  }
}
