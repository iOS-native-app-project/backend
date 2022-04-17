import { EntityRepository, Repository } from 'typeorm';
import { Meeting } from '../entities/meeting.entity';

@EntityRepository(Meeting)
export class MeetingRepository extends Repository<Meeting> {
  
}
