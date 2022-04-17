import { Module } from '@nestjs/common';
import { MeetingDetailController } from './meeting-detail.controller';
import { MeetingDetailService } from './meeting-detail.service';

@Module({
  controllers: [MeetingDetailController],
  providers: [MeetingDetailService]
})
export class MeetingDetailModule {}
