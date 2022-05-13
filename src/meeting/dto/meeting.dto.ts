import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class MeetingCategoryDto {
  @IsArray()
  @ApiProperty({
    example: [1],
    description: '모임 카테고리',
  })
  categoryId: number[];
}

export class CheckPasswordDto {
  @IsString()
  @ApiProperty({
    example: '1234',
    description: '비밀번호',
  })
  password: string;
}
