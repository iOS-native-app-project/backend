import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeetingController } from './meeting.controller';
import { MeetingService } from './meeting.service';
import { MeetingUserRepository } from './repositories/meeting-user.repository';
import { MeetingRepository } from './repositories/meeting.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([MeetingRepository, MeetingUserRepository]),
  ],
  controllers: [MeetingController],
  providers: [MeetingService],
  exports: [MeetingService],
})
export class MeetingModule {}
