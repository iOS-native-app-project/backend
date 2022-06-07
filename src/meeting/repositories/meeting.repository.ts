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
  async findAll(random?: boolean) {
    const qb = this.createQueryBuilder('meeting')
      .where('meeting.isDeleted = 0')
      .leftJoinAndSelect('meeting.users', 'user')
      .leftJoinAndSelect('meeting.category', 'category');

    if (random) qb.orderBy('rand()').limit(12);
    else qb.orderBy('meeting.created_at', 'DESC');

    return qb.getMany();
  }

  async getMeetingById(id: number, userId?: number) {
    const qb = this.createQueryBuilder('meeting')
      .where('meeting.isDeleted = 0')
      .andWhere('meeting.id = :id', { id })
      .leftJoinAndSelect('meeting.users', 'user')
      .leftJoinAndSelect('meeting.category', 'category');

    if (userId) qb.andWhere('meeting.ownerId = :userId', { userId });

    return qb.getOne();
  }

  async getMeetingBySearch(search: string) {
    return this.createQueryBuilder('meeting')
      .where('meeting.isDeleted = 0')
      .andWhere('meeting.name like :name', { name: '%' + search + '%' })
      .orWhere('meeting.descript like :descript', {
        descript: '%' + search + '%',
      })
      .leftJoinAndSelect('meeting.users', 'user')
      .leftJoinAndSelect('meeting.category', 'category')
      .getMany();
  }

  async getMeetingByCategory(categoryId: number[]) {
    return this.createQueryBuilder('meeting')
      .where('meeting.isDeleted = 0')
      .andWhere('meeting.categoryId IN (:...ids)', { ids: categoryId })
      .leftJoinAndSelect('meeting.users', 'user')
      .leftJoinAndSelect('meeting.category', 'category')
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

  async deleteMeeing(meetingId: number) {
    return this.update(meetingId, { isDeleted: 1 });
  }
}
