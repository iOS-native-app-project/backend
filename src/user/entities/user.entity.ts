import { Column, Entity, OneToMany } from 'typeorm';
import { CoreEntityAndDelete } from 'src/common/entity/core.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, Length } from 'class-validator';
import { MeetingUser } from 'src/meeting-user/entities/meeting-user.entity';
import { Meeting } from 'src/meeting/entities/meeting.entity';
import { Record } from '../../record/entities/record.entity';

@Entity({ name: 'user' })
export class User extends CoreEntityAndDelete {
  @ApiProperty({
    example: 'KAKAO',
    description: '소셜 로그인 종류',
  })
  @Column({ name: 'uid', type: 'varchar' })
  uid: string;

  @ApiProperty({
    example: '유저',
    description: '닉네임',
    required: false,
  })
  @Length(1, 10)
  @Column({ name: 'nickname', type: 'varchar', length: 10, nullable: true })
  nickname: string;

  @ApiProperty({
    example: 'img.png',
    description: '이미지 경로',
    required: false,
  })
  @Length(1, 100)
  @IsOptional()
  @Column({ name: 'image_path', type: 'varchar', length: 100, nullable: true })
  imagePath: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ2NDI5NTc0LCJleHAiOjE2NDY1MTU5NzR9.y0laz-HyxDPkV8LXxeGitO6bddcBt_vhBA8RekEIozk',
    description: '재발급 토큰',
  })
  @IsNotEmpty()
  @Column('varchar', {
    name: 'refresh_token',
    length: 500,
    nullable: true,
    select: false,
  })
  refreshToken: string;

  @OneToMany(() => MeetingUser, (tbMeetingUser) => tbMeetingUser.users)
  meetingUsers: MeetingUser[];

  @OneToMany(() => Meeting, (tbMeeting) => tbMeeting.users)
  meetings: Meeting[];
}
