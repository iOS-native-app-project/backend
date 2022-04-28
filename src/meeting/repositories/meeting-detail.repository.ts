import { EntityRepository, Repository } from 'typeorm';
import { CreateMeetingDetailDto } from '../dto/create-meeting-detail.dto';
import { MeetingUserDetail } from '../entities/meeting-user-detail.entity';

@EntityRepository(MeetingUserDetail)
export class MeetingDetailRepository extends Repository<MeetingUserDetail> {
  async createMeetingDetail(createMeetingDetailDto: CreateMeetingDetailDto) {
    const meetingDetail = this.create({
      ...createMeetingDetailDto,
    });
    return this.save(meetingDetail);
  }
}
