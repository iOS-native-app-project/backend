import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreOutput } from 'src/common/dto/core.dto';
import { CategoryOutput } from './dto/category.dto';
import { Category } from './entities/category.entity';
import { CategoryRepository } from './repositories/category.repository';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
  ) {}

  async getCategory(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }
}
