import { ApiProperty } from '@nestjs/swagger';
import { CoreEntity } from 'src/common/entity/core.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { MeetingUser } from './meeting-user.entity';

@Entity({ name: 'meeting_user_detail' })
export class MeetingUserDetail extends CoreEntity {
  @ApiProperty({
    example: 1,
    description: '모임 유저 ID',
  })
  @Column('varchar', { name: 'meeting_user_id' })
  meeting_user_id: string;

  @ApiProperty({
    example: '1970-01-01 00:00:00',
    description: '기록 날짜',
  })
  @Column('datetime', {
    name: 'date',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  date: number;

  @ApiProperty({
    example: 1,
    description: '상세탈성수치',
  })
  @Column('int', { name: 'value', default: 0, comment: '상세달성수치' })
  value: string;

  @ApiProperty({
    example: 'img.png',
    description: '상세 이미지',
  })
  @Column('varchar', { name: 'image', length: 100, nullable: true })
  image: string;

  @ApiProperty({
    example: '상세 설명',
    description: '설명',
  })
  @Column('varchar', { name: 'descript', length: 200, nullable: true })
  descript: string;

  @ManyToOne(() => MeetingUser, (tbMeetingUser) => tbMeetingUser.id, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'meeting_user_id' }])
  meetingUser: MeetingUser;
}
