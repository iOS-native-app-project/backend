import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { AuthType } from '../auth-type.enum';

export class LoginRequestDto {
  @ApiProperty({
    example: 'KAKAO',
    description: '소셜 로그인 종류',
  })
  @IsEnum(AuthType, {
    message: 'authType must be a valid enum values (APPLE, KAKAO, NAVER)',
  })
  authType: string;

  @ApiProperty({
    example:
      'AAAAOIDxJz_opfuuHc4DsmXJTigwuqCNLORA0_AUy14clrFrplBco_qcZfXCYr_DxA5g8ZFqWJWdkN4-K81TE26nPbY',
    description: '로그인 Token',
  })
  @IsNotEmpty()
  token: string;
}
