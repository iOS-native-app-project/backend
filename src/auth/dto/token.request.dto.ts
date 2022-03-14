import { PickType } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

export class TokenRequestDto extends PickType(User, [
  'refreshToken',
] as const) {}
