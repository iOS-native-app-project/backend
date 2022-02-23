import { Column, Entity } from 'typeorm';
import { AuthType } from 'src/auth/auth-type.enum';
import { AutoIdDeleteDateEntity } from '.';

@Entity({ name: 'users' })
export class User extends AutoIdDeleteDateEntity {
  @Column('enum', { name: 'type', enum: AuthType })
  type: string;

  @Column('varchar', { name: 'email', unique: true, length: 30 })
  email: string;

  @Column('varchar', { name: 'nick_name', length: 10, nullable: true })
  nickName: string;
}
