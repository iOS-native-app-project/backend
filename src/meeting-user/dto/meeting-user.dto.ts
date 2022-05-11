import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ReportUserDto {
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: '상대유저',
  })
  userId: number;

  @IsNumber()
  @ApiProperty({
    example: 0,
    description: 'type 0: 추천, 1: 신고',
  })
  type: number;
}
