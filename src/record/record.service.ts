import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MeetingUserRepository } from '../meeting/repositories/meeting-user.repository';
import { User } from '../user/entities/user.entity';
import { CreateRecordDto } from './dto/create-record.dto';
import { Record } from './entities/record.entity';
import { RecordRepository } from './repositories/record.repository';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(RecordRepository)
    private recordRepository: RecordRepository,

    @InjectRepository(MeetingUserRepository)
    private meetingUserRepository: MeetingUserRepository,
  ) {}
  async create(
    createRecordDto: CreateRecordDto,
    meetingId: number,
    user: User,
  ) {
    await this.validation(user.id, meetingId);

    await this.recordRepository.createSave(createRecordDto, user.id);

    return;
  }

  async findAll(meetingId: number, user: User) {
    const meetingUserId = await this.validation(user.id, meetingId);

    return this.recordRepository.findAll(meetingId, meetingUserId);
  }

  async validation(userId: number, meetingId) {
    const meetingUser =
      await this.meetingUserRepository.getMeetingByUserIdAndMeetingId(
        userId,
        meetingId,
      );

    if (!meetingUser) {
      throw new NotFoundException();
    }

    return meetingUser.id;
  }
}
