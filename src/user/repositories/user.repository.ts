import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findById(id: number, select: boolean) {
    return await this.createQueryBuilder('user')
      .addSelect(select ? 'user.refreshToken' : '')
      .where('user.id = :id', { id })
      .getOne();
  }
}
