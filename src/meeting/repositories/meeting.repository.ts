import { HttpException, NotFoundException } from '@nestjs/common';
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
  async getMeetingByUserId(userId: number) {
    return await this.createQueryBuilder('meeting')
      .innerJoinAndSelect(
        'meeting.meetingUsers',
        'meeting_user',
        `meeting_user.userId = ${userId}`,
      )
      .getMany();
  }

  async findAll() {
    return await this.createQueryBuilder('meeting')
      .leftJoinAndSelect('meeting.users', 'user')
      .leftJoinAndSelect('meeting.category', 'category')
      .orderBy('meeting.created_at', 'DESC')
      .getMany();
  }

  async random() {
    return await this.createQueryBuilder('meeting')
      .leftJoinAndSelect('meeting.users', 'user')
      .leftJoinAndSelect('meeting.category', 'category')
      .innerJoin(
        (subQuery) => {
          return subQuery.from(Meeting, 'meeting').orderBy('rand()').limit(12);
        },
        'sq',
        'meeting.id = sq.id',
      )
      .withDeleted()
      .getMany();
  }

  async getMeetingById({
    meetingId,
    userId,
  }: {
    meetingId: number;
    userId?: number;
  }) {
    const qb = this.createQueryBuilder('meeting')
      .where('meeting.id = :meetingId', { meetingId })
      .leftJoinAndSelect('meeting.users', 'user')
      .leftJoinAndSelect('meeting.category', 'category');

    if (userId) qb.andWhere('meeting.ownerId = :userId', { userId });

    return qb.getOne();
  }

  async getMeetingBySearch(search: string) {
    return this.createQueryBuilder('meeting')
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

  async deleteMeeing(id: number) {
    try {
      const deleteResponse = await this.softDelete(id);
      if (!deleteResponse.affected)
        throw new NotFoundException('존재하지 않는 모임입니다.');
    } catch (error) {
      throw new HttpException({ error: error }, 500);
    }
  }
}
