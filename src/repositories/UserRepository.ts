import { User } from 'src/entities/User';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findUserByEmail(email: string) {
    return await this.find({ email });
  }

  async createUser(email: string) {
    const user = new User();
    user.email = email;

    return await this.save(user);
  }
}
