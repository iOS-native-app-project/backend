import { CoreEntity } from 'src/common/entity/core.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'category' })
export class Category extends CoreEntity {
  @Column('varchar', {
    name: 'name',
    length: 200,
    default: '공부',
    comment: '모임 카테고리',
  })
  name: string;
}
