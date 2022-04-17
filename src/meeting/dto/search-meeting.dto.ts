import { CoreOutput } from 'src/common/dto/core.dto';
import { Meeting } from '../entities/meeting.entity';

export class SearchMeetingInput {}

export class SearchMeetingOutput extends CoreOutput {
  data?: Array<Meeting>;
}
