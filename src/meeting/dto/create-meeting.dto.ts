import { OmitType } from '@nestjs/swagger';
import { Meeting } from '../entities/meeting.entity';

export class CreateMeetingDto extends OmitType(Meeting, [
  'id',
  'createdAt',
  'updatedAt',
  'ownerId',
  'round',
]) {}
