import { OmitType } from '@nestjs/swagger';
import { MeetingUserDetail } from '../entities/meeting-user-detail.entity';

export class CreateMeetingDetailDto extends OmitType(MeetingUserDetail, [
  'id',
  'createdAt',
  'updatedAt',
]) {}
