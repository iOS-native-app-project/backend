import { EntityRepository, Repository } from 'typeorm';
import { MeetingUserDetail } from '../entities/meeting-user-detail.entity';

@EntityRepository(MeetingUserDetail)
export class MeetingDetailRepository extends Repository<MeetingUserDetail> {}
