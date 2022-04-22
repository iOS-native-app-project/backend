import { CoreOutput } from 'src/common/dto/core.dto';
import { Category } from '../entities/category.entity';

export class CategoryOutput extends CoreOutput {
  data?: Array<Category>;
}
