import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MeetingUserRepository } from '../meeting-user/repositories/meeting-user.repository';
import { User } from '../user/entities/user.entity';
import { CreateRecordDto } from './dto/create-record.dto';
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
    const meetingUserId = await this.validation(user.id, meetingId);
    const duplicate = await this.duplicate(
      meetingId,
      user.id,
      createRecordDto.date,
    );

    if (duplicate) {
      throw new BadRequestException('Already registered.');
    }
    await this.recordRepository.createSave(
      createRecordDto,
      meetingId,
      meetingUserId,
    );

    return;
  }

  async findAll(meetingId: number, user: User) {
    const meetingUserId = await this.validation(user.id, meetingId);

    return this.recordRepository.findAll(meetingId, meetingUserId);
  }

  async duplicate(meetingId: number, userId: number, date: string) {
    const record = await this.recordRepository.findByDate(
      meetingId,
      userId,
      date,
    );

    return record ? true : false;
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
