import { IsEnum, IsNotEmpty } from 'class-validator';
import { AuthType } from '../auth-type.enum';

export class AuthCredentialsDto {
  @IsEnum(AuthType, {
    message: 'authType must be a valid enum values (APPLE, KAKAO, NAVER)',
  })
  authType: AuthType;

  @IsNotEmpty()
  token: string;
}
