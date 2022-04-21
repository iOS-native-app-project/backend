import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { CreateRecordDto } from './dto/create-record.dto';
import { Record } from './entities/record.entity';
import { RecordRepository } from './repositories/record.repository';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(RecordRepository)
    private recordRepository: RecordRepository,
  ) {}
  async create(createRecordDto: CreateRecordDto, user: User) {
    const { image, descript, date, value } = createRecordDto;

    const record = new Record();
    record.image = image;
    record.descript = descript;
    record.date = date;
    record.value = value;
    record.user = user;

    await this.recordRepository.save(record);

    return;
  }

  findAll(meetingId: number, user: User) {
    return this.recordRepository.findAll(meetingId, user.id);
  }

  async findOne(meetingId: number, id: number, user: User) {
    const record = await this.recordRepository.findById(id, meetingId, user.id);

    if (!record) {
      throw new NotFoundException('There is no matching information.');
    }

    return record;
  }
}
