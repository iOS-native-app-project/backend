import { OmitType } from '@nestjs/swagger';
import { CoreOutput } from 'src/common/dto/core.dto';
import { Meeting } from '../entities/meeting.entity';

export class CreateMeetingDto extends OmitType(Meeting, [
  'id',
  'createdAt',
  'updatedAt',
  'owner_id',
]) {}

export class CreateMeetingOutput extends CoreOutput {
  data?: Meeting;
}
