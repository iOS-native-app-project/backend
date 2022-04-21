import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordRepository } from './repositories/record.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RecordRepository])],
  controllers: [RecordController],
  providers: [RecordService],
})
export class RecordModule {}
