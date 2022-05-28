import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MeetingUserRepository } from '../meeting-user/repositories/meeting-user.repository';
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

  async create({
    createRecordDto,
    meetingId,
    userId,
  }: {
    createRecordDto: CreateRecordDto;
    meetingId: number;
    userId: number;
  }) {
    const meetingUserId = await this.validation({ userId, meetingId });

    const duplicate = await this.duplicate({
      meetingId,
      meetingUserId,
      date: createRecordDto.date,
    });

    if (duplicate) {
      throw new BadRequestException('Already registered.');
    }

    await this.recordRepository.createSave({
      createRecordDto,
      meetingId,
      meetingUserId,
    });

    return;
  }

  async findByYearAndMonth({
    meetingId,
    userId,
    year,
    month,
  }: {
    meetingId: number;
    userId: number;
    year: number;
    month: number;
  }) {
    const meetingUserId = await this.validation({ userId, meetingId });

    return this.recordRepository.findRecords({
      meetingId,
      meetingUserId,
      year,
      month,
    });
  }

  async findUserRecordByAndYearAndMonth({
    targetUserId,
    meetingId,
    userId,
    year,
    month,
  }: {
    targetUserId: number;
    meetingId: number;
    userId: number;
    year: number;
    month: number;
  }) {
    await this.validation({ userId, meetingId });
    const meetingTargetUserId = await this.validation({
      userId: targetUserId,
      meetingId,
    });

    console.log(meetingTargetUserId);

    return this.recordRepository.findRecords({
      meetingId,
      meetingUserId: meetingTargetUserId,
      year,
      month,
    });
  }

  async duplicate({
    meetingId,
    meetingUserId,
    date,
  }: {
    meetingId: number;
    meetingUserId: number;
    date: string;
  }) {
    const record = await this.recordRepository.findRecords({
      meetingId,
      meetingUserId,
      date,
    });

    return record.length > 0 ? true : false;
  }

  async validation({ userId, meetingId }: { userId: number; meetingId }) {
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
