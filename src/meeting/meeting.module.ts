import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
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
      MeetingDetailRepository,
      CategoryRepository,
    ]),
  ],
  controllers: [MeetingController],
  providers: [MeetingService, CategoryService],
  exports: [MeetingService],
})
export class MeetingModule {}
