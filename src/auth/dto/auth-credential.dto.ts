import { IsEnum, IsNotEmpty } from 'class-validator';
import { AuthType } from '../auth-type.enum';

export class AuthCredentialsDto {
  @IsEnum(AuthType)
  authType: AuthType;

  @IsNotEmpty()
  token: string;
}
