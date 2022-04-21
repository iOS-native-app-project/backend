import { ApiProperty } from '@nestjs/swagger';
import { CoreOutput } from 'src/common/dto/core.dto';
import { Meeting } from '../entities/meeting.entity';

export class SearchMeetingOutput extends CoreOutput {
  data?: Array<Meeting>;
}

export class MeetingCategoryDto {
  @ApiProperty()
  category_id: number[];
}
