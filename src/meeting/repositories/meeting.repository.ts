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
  async findAll() {
    return this.createQueryBuilder('meeting')
      .where('meeting.isDeleted = 0')
      .leftJoinAndSelect('meeting.users', 'user')
      .leftJoinAndSelect('meeting.category', 'category')
      .getMany();
  }

  async getRandomMeeting() {
    return this.createQueryBuilder('meeting')
      .select([
        'meeting.id',
        'meeting.name',
        'meeting.descript',
        'meeting.image',
        'meeting.limit',
        'meeting.cycle',
        'meeting.unit',
        'meeting.targetAmount',
      ])
      .where('meeting.isDeleted = 0')
      .leftJoinAndSelect('meeting.users', 'user')
      .leftJoinAndSelect('meeting.category', 'category')
      .orderBy('rand()')
      .limit(12)
      .getRawMany();
  }

  async getMeetingById(id: number) {
    return this.createQueryBuilder('meeting')
      .select([
        'meeting.id',
        'meeting.createdAt',
        'meeting.name',
        'meeting.image',
        'meeting.descript',
        'meeting.limit',
        'meeting.cycle',
        'meeting.unit',
        'meeting.round',
        'meeting.targetAmount',
      ])
      .leftJoinAndSelect('meeting.users', 'user')
      .leftJoinAndSelect('meeting.category', 'category')
      .where('meeting.id = :id', { id })
      .andWhere('meeting.isDeleted = 0')
      .getRawOne();
  }

  async getMeetingBySearch(search: string) {
    return this.createQueryBuilder('meeting')
      .where('meeting.name like :name', { name: '%' + search + '%' })
      .orWhere('meeting.descript like :descript', {
        descript: '%' + search + '%',
      })
      .andWhere('meeting.isDeleted = 0')
      .leftJoinAndSelect('meeting.users', 'user')
      .leftJoinAndSelect('meeting.category', 'category')
      .getMany();
  }

  async getMeetingByCategory(categoryId: number[]) {
    return this.createQueryBuilder('meeting')
      .where('meeting.categoryId IN (:...ids)', { ids: categoryId })
      .andWhere('meeting.isDeleted = 0')
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

  async checkMeetingOwner(userId: number, meetingId: number) {
    return this.createQueryBuilder('meeting')
      .where('meeting.isDeleted = 0')
      .andWhere('meeting.id = :meetingId', { meetingId })
      .andWhere('meeting.ownerId = :userId', { userId })
      .leftJoinAndSelect('meeting.users', 'user')
      .leftJoinAndSelect('meeting.category', 'category')
      .getMany();
  }
}
