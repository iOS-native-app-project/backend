import { InternalServerErrorException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/category/entities/category.entity';
import { CoreEntity } from 'src/common/entity/core.entity';
import { User } from 'src/user/entities/user.entity';
import { MeetingUser } from './meeting-user.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

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
  categoryId: number;

  @ApiProperty({
    example: '모임 설명',
    description: '모임 설명',
    required: false,
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
  ownerId: number;

  @ApiProperty({
    example: '1234',
    description: '모임 비밀번호',
    required: false,
  })
  @Column('varchar', {
    name: 'password',
    length: 100,
    comment: '모임 비밀번호',
    nullable: true,
  })
  password: string;

  @ApiProperty({
    example: '0',
    description: '목표 주기 (0:하루, 1:일주일, 2:한달)',
  })
  @Column('int', {
    name: 'cycle',
    comment: '주기 (0:하루,1:일주일,2:한달)',
    default: 0,
  })
  cycle: number;

  @ApiProperty({
    example: '횟수',
    description: '목표 단위 (횟수, 거리, 시간)',
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
    description: '목표달성수치 (거리:m 단위, 시간:분 단위)',
  })
  @Column('int', {
    name: 'target_amount',
    comment: '목표달성수치 (거리:m 단위, 시간:분 단위)',
    default: 10,
  })
  targetAmount: number;

  @Column('int', {
    name: 'round',
    comment: '모임의 차수',
    default: 1,
  })
  round: number;

  @OneToMany(() => MeetingUser, (tbMeetingUser) => tbMeetingUser.meetings)
  meetingUsers: MeetingUser[];

  @ManyToOne(() => Category, (tbCategory) => tbCategory.id, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'category_id' }])
  category: Category;

  @ManyToOne(() => User, (tbUser) => tbUser.id, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'owner_id' }])
  users: User;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (e) {
        console.log(e);
        throw new InternalServerErrorException();
      }
    }
  }
}
