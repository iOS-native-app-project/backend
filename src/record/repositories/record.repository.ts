import { EntityRepository, Repository } from 'typeorm';
import { CreateRecordDto } from '../dto/create-record.dto';
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

  async findByDate(meetingId: number, meetingUserId: number, date: string) {
    return await this.createQueryBuilder('record')
      .where(
        'meeting_user_id = :meetingUserId and meeting_id = :meetingId and date = :date',
        {
          meetingUserId,
          meetingId,
          date,
        },
      )
      .getOne();
  }

  async createSave(
    createRecordDto: CreateRecordDto,
    meetingId: number,
    meetingUserId: number,
  ) {
    return this.save(
      this.create({
        ...createRecordDto,
        meetingId,
        meetingUserId,
      }),
    );
  }

  getMeetingValueSumByMeetingUserId(
    id: number,
    startDate: string,
    endDate: string,
  ) {
    return this.createQueryBuilder('record')
      .select(['sum(value) as sum_value'])
      .where(`date BETWEEN '${startDate}' AND '${endDate}'`)
      .andWhere('meeting_user_id = :id', { id })
      .leftJoin('record.meetingUser', 'meetingUser')
      .groupBy('meeting_user_id')
      .getRawOne();
  }

  getMeetingValueSum(startDate: string, endDate: string, id: number) {
    return this.createQueryBuilder('record')
      .select(['sum(value) as sum_value'])
      .where(`date BETWEEN '${startDate}' AND '${endDate}'`)
      .andWhere('meeting_id = :id', { id })
      .getRawOne();
  }
}
