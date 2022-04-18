import { InjectConnection } from '@nestjs/typeorm';
import { Connection, EntityRepository, Repository } from 'typeorm';
import { Meeting } from '../entities/meeting.entity';

@EntityRepository(Meeting)
export class MeetingRepository extends Repository<Meeting> {
  constructor(
    @InjectConnection()
    private connection: Connection,
  ) {
    super();
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

  async getMeetingByUserId(user_id: number) {
    return this.connection.query(
      `select * from meeting m left outer join meeting_user m_user 
      on m_user.meeting_id = m.id where m_user.user_id = ?`,
      [user_id],
    );
  }

  async getMeetingById(meeting_id: number) {
    return this.createQueryBuilder('meeting')
      .select([
        'meeting.name',
        'meeting.descript',
        'meeting.limit',
        'meeting.category_id',
      ])
      .where('meeting.id = :id', { id: meeting_id })
      .getMany();
  }
}
