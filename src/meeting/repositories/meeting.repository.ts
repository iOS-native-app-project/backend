import {
  EntityManager,
  EntityRepository,
  Repository,
  TransactionManager,
} from 'typeorm';
import { CreateMeetingDto } from '../dto/create-meeting.dto';
import { Meeting } from '../entities/meeting.entity';

@EntityRepository(Meeting)
export class MeetingRepository extends Repository<Meeting> {
  async getAll() {
    return this.createQueryBuilder('meeting')
      .select([
        'meeting.id',
        'meeting.name',
        'meeting.descript',
        'meeting.image',
      ])
      .getRawMany();
  }

  async getMeetingById(id: number) {
    return this.createQueryBuilder('meeting')
      .addSelect('meeting.createdAt')
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

  async getMeetingByCategory(categoryId: number[]) {
    return this.createQueryBuilder('meeting')
      .where('meeting.categoryId IN (:...ids)', { ids: categoryId })
      .getMany();
  }

  async createMeeting(
    @TransactionManager() transactionManager: EntityManager,
    userId: number,
    createMeetingDto: CreateMeetingDto,
  ) {
    return transactionManager.save(
      transactionManager.create(Meeting, {
        ...createMeetingDto,
        ownerId: userId,
      }),
    );
  }
}
