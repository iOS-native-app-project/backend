import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Length } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CoreEntity } from '../../common/entity/core.entity';
import { Meeting } from '../../meeting/entities/meeting.entity';
import { User } from '../../user/entities/user.entity';

@Entity({ name: 'record' })
export class Record extends CoreEntity {
  @ApiProperty({
    example: 'img.png',
    description: '이미지 경로',
  })
  @Length(1, 100)
  @Column({
    name: 'image',
    type: 'varchar',
    length: 100,
  })
  image: string;

  @ApiProperty({
    example: 10,
    description: '수치',
  })
  @IsInt()
  @Column({
    name: 'value',
    type: 'int',
  })
  value: number;

  @ApiProperty({
    example: 10,
    description: '설명',
  })
  @Length(1, 100)
  @Column({
    name: 'descript',
    type: 'varchar',
    length: 100,
  })
  descript: string;

  @ApiProperty({
    example: '2022-01-01',
    description: '날짜',
  })
  @Length(10, 10, { message: 'Please enter a date in the format yyyy-mm-dd.' })
  @Column({ name: 'date', type: 'varchar', length: 6 })
  date;

  @ManyToOne(() => User, (tbUser) => tbUser.records, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
