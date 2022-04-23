import { PickType } from '@nestjs/swagger';
import { Meeting } from '../entities/meeting.entity';

export class CreateMeetingDto extends PickType(Meeting, [
  'name',
  'image',
  'category_id',
  'descript',
  'limit',
  'password',
  'cycle',
  'unit',
  'target_amount',
  'target_unit',
]) {}
