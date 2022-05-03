import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordRepository } from './repositories/record.repository';
import { MeetingUserRepository } from '../meeting/repositories/meeting-user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([RecordRepository, MeetingUserRepository]),
  ],
  controllers: [RecordController],
  providers: [RecordService],
})
export class RecordModule {}
