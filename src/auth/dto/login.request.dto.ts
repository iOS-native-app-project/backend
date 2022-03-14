import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class LoginRequestDto extends PickType(User, ['authType'] as const) {
  @ApiProperty({
    example:
      'AAAAOIDxJz_opfuuHc4DsmXJTigwuqCNLORA0_AUy14clrFrplBco_qcZfXCYr_DxA5g8ZFqWJWdkN4-K81TE26nPbY',
    description: '로그인 Token',
  })
  @IsNotEmpty()
  token: string;
}
