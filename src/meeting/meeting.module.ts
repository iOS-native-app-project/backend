import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryRepository } from 'src/category/repositories/category.repository';
import { MeetingController } from './meeting.controller';
import { MeetingService } from './meeting.service';
import { MeetingDetailRepository } from './repositories/meeting-detail.repository';
import { MeetingUserRepository } from './repositories/meeting-user.repository';
import { MeetingRepository } from './repositories/meeting.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MeetingRepository,
      MeetingUserRepository,
      CategoryRepository,
      MeetingDetailRepository,
    ]),
  ],
  controllers: [MeetingController],
  providers: [MeetingService],
  exports: [MeetingService],
})
export class MeetingModule {}
