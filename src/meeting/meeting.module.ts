import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { CategoryRepository } from 'src/category/repositories/category.repository';
import { RecordRepository } from 'src/record/repositories/record.repository';
import { MeetingController } from './meeting.controller';
import { MeetingService } from './meeting.service';
import { MeetingUserRepository } from './repositories/meeting-user.repository';
import { MeetingRepository } from './repositories/meeting.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MeetingRepository,
      MeetingUserRepository,
      CategoryRepository,
      RecordRepository,
    ]),
  ],
  controllers: [MeetingController],
  providers: [MeetingService, CategoryService],
  exports: [MeetingService],
})
export class MeetingModule {}
