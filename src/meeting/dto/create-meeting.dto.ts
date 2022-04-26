import { OmitType } from '@nestjs/swagger';
import { Meeting } from '../entities/meeting.entity';

export class CreateMeetingDto extends OmitType(Meeting, [
  'id',
  'createdAt',
  'updatedAt',
  'owner_id',
]) {}
