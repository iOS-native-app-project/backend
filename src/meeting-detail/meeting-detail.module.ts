import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeetingDetailController } from './meeting-detail.controller';
import { MeetingDetailService } from './meeting-detail.service';
import { MeetingDetailRepository } from './repositories/meeting-detail.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MeetingDetailRepository])],
  controllers: [MeetingDetailController],
  providers: [MeetingDetailService],
  exports: [MeetingDetailService],
})
export class MeetingDetailModule {}
