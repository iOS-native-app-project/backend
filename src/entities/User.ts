import { Column, Entity } from 'typeorm';
import { AutoIdDeleteDateEntity } from '.';

@Entity({ name: 'users' })
export class User extends AutoIdDeleteDateEntity {
  @Column('varchar', { name: 'email', unique: true, length: 30 })
  email?: string;

  @Column('varchar', { name: 'password', length: 100, select: false })
  password?: string;

  @Column('varchar', { name: 'nick_name', length: 10 })
  nickName?: string;
}
