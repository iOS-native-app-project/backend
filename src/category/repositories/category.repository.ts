import { EntityRepository, Repository } from 'typeorm';
import { Category } from '../entities/category.entity';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  async getCategoryById(id: number) {
    return this.createQueryBuilder('category')
      .select(['category.name'])
      .where('category.id = :id', { id: id })
      .getOne();
  }
}
