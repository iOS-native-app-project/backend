import { Column, Entity } from 'typeorm';
import { CoreEntityAndDelete } from 'src/common/entity/core.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

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
  })
  @Length(1, 10)
  @Column({ name: 'nickname', type: 'varchar', length: 10, nullable: true })
  nickname: string;

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
}
