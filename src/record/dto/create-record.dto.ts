import { PickType } from '@nestjs/swagger';
import { Record } from '../entities/record.entity';

export class CreateRecordDto extends PickType(Record, [
  'image',
  'descript',
  'date',
  'value',
] as const) {}
