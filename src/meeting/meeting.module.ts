import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordRepository } from 'src/record/repositories/record.repository';
import { MeetingController } from './meeting.controller';
import { MeetingService } from './meeting.service';
import { MeetingUserRepository } from '../meeting-user/repositories/meeting-user.repository';
import { MeetingRepository } from './repositories/meeting.repository';
import { MeetingUserService } from 'src/meeting-user/meeting-user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MeetingRepository,
      MeetingUserRepository,
      RecordRepository,
    ]),
  ],
  controllers: [MeetingController],
  providers: [MeetingService, MeetingUserService],
  exports: [MeetingService],
})
export class MeetingModule {}
