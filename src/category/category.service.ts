import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreOutput } from 'src/common/dto/core.dto';
import { CategoryOutput } from './dto/category.dto';
import { CategoryRepository } from './repositories/category.repository';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
  ) {}

  async getCategory(): Promise<CategoryOutput> {
    const categories = await this.categoryRepository.find();
    if (categories) {
      return {
        status: 'SUCCESS',
        code: 200,
        data: categories,
      };
    }
    return {
      status: 'SUCCESS',
      code: 200,
      msg: '검색 결과가 없습니다.',
    };
  }
}
