import { InjectConnection } from '@nestjs/typeorm';
import { Connection, EntityRepository, Repository } from 'typeorm';
import { CreateMeetingDto } from '../dto/create-meeting.dto';
import { Meeting } from '../entities/meeting.entity';

@EntityRepository(Meeting)
export class MeetingRepository extends Repository<Meeting> {
  constructor(
    @InjectConnection()
    private connection: Connection,
  ) {
    super();
  }

  async getMeeting(id: number) {
    return this.createQueryBuilder('meeting')
      .select([
        'meeting.name, meeting.image, meeting.descript, meeting.limit',
        'meeting.cycle, meeting.unit, meeting.target_amount, meeting.target_unit',
        'category.name as categoryName',
        'user.nickname as ownerName',
        'user.image_path as userImage',
      ])
      .leftJoinAndSelect('meeting.users', 'user')
      .leftJoinAndSelect('meeting.category', 'category')
      .where('meeting.id = :id', { id })
      .getOne();
  }

  async getMeetingBySearch(search: string) {
    return this.createQueryBuilder('meeting')
      .where('meeting.name like :name', { name: '%' + search + '%' })
      .orWhere('meeting.descript like :descript', {
        descript: '%' + search + '%',
      })
      .getMany();
  }

  async getMeetingByCategory(category_id: number[]) {
    return this.createQueryBuilder('meeting')
      .where('meeting.category_id IN (:...ids)', { ids: category_id })
      .getMany();
  }

  // todo : meeting_user에도 create
  async createMeeting(user_id: number, createMeetingDto: CreateMeetingDto) {
    const meeting = this.create({
      ...createMeetingDto,
      owner_id: user_id,
    });
    return this.save(meeting);
  }
}
