import { Column, Entity } from 'typeorm';
import { AuthType } from 'src/auth/auth-type.enum';
import { CoreEntityAndDelete } from 'src/core.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, Length } from 'class-validator';

@Entity({ name: 'users' })
export class User extends CoreEntityAndDelete {
  @ApiProperty({
    example: 'KAKAO',
    description: '소셜 로그인 종류',
  })
  @IsEnum(AuthType, {
    message: 'authType must be a valid enum values (APPLE, KAKAO, NAVER)',
  })
  @Column({ name: 'auth_type', type: 'enum', enum: AuthType })
  authType: string;

  @ApiProperty({
    example: 'user@domain.com',
    description: '이메일',
  })
  @IsEmail()
  @Column({ name: 'email', type: 'varchar', length: 30 })
  email: string;

  @ApiProperty({
    example: '유저',
    description: '닉네임',
  })
  @Length(1, 10)
  @Column({ name: 'nick_name', type: 'varchar', length: 10, nullable: true })
  nickName: string;

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
