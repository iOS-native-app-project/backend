import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { CoreOutput } from 'src/common/dto/core.dto';
import { Meeting } from '../entities/meeting.entity';

export class SearchMeetingOutput extends CoreOutput {
  data?: Array<Meeting>;
}

export class MeetingCategoryDto {
  @IsArray()
  @ApiProperty({
    example: [1],
    description: '모임 카테고리',
  })
  category_id: number[];
}
