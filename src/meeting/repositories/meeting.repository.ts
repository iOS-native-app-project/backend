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

  async getMeeting(id: number) {
    return this.connection.query(
      `select meeting.*, category.name as categoryName, user.nickname as ownerName, 
        user.image_path as userImage from meeting 
	      join user on user.id = meeting.owner_id 
		    join category on category.id = meeting.category_id
			  where meeting.id = ?`,
      [id],
    );
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
}
