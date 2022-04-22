import { MeetingUser } from './meeting-user.entity';
import { CoreEntity } from 'src/common/entity/core.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'meeting' })
export class Meeting extends CoreEntity {
  @ApiProperty({
    example: '모임이름',
    description: '모임이름',
  })
  @Column('varchar', { name: 'name', length: 100, comment: '모임 이름' })
  name: string;

  @ApiProperty({
    example: 'img.png',
    description: '모임 이미지',
  })
  @Column('varchar', { name: 'image', length: 150, comment: '모임 이미지' })
  image: string;

  @ApiProperty({
    example: '1',
    description: '카테고리 id',
  })
  @Column('int', { name: 'category_id', default: 1 })
  category_id: number;

  @ApiProperty({
    example: '모임 설명',
    description: '모임 설명',
  })
  @Column('varchar', {
    name: 'descript',
    length: 200,
    comment: '모임 설명',
    nullable: true,
  })
  descript: string;

  @ApiProperty({
    example: '10',
    description: '인원수 제한',
  })
  @Column('int', { name: 'limit', comment: '인원수 제한', default: 10 })
  limit: number;

  @ApiProperty({
    example: '1',
    description: '방장 id',
  })
  @Column('int', { name: 'owner_id', comment: '방장' })
  owner_id: number;

  @ApiProperty({
    example: '1234',
    description: '모임 비밀번호',
  })
  @Column('varchar', {
    name: 'password',
    length: 100,
    comment: '모임 비밀번호',
    nullable: true,
  })
  password: string;

  @ApiProperty({
    example: '0:하루, 1:일주일, 2:한달',
    description: '목표 주기',
  })
  @Column('int', {
    name: 'cycle',
    comment: '주기 (0:하루,1:일주일,2:한달)',
    default: 0,
  })
  cycle: number;

  @ApiProperty({
    example: '횟수, 거리, 시간',
    description: '목표 단위',
  })
  @Column('varchar', {
    name: 'unit',
    length: 100,
    default: '횟수',
    comment: '단위 (횟수,거리,시간)',
  })
  unit: string;

  @ApiProperty({
    example: '10',
    description: '목표달성수치',
  })
  @Column('int', { name: 'target_amount', comment: '목표달성수치' })
  target_amount: number;

  @ApiProperty({
    example: '1',
    description: '목표 단위 (회, km, m, 분, 시간)',
  })
  @Column('int', { name: 'target_unit', comment: '목표단위' })
  target_unit: number;

  @OneToMany(() => Category, (tbCategory) => tbCategory.id, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'category_id' }])
  category: Category;

  @OneToMany(() => MeetingUser, (tbMeetingUser) => tbMeetingUser.meeting)
  meetingUser: MeetingUser[];

  @OneToMany(() => User, (tbUser) => tbUser.id, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'owner_id' }])
  user: User;
}
