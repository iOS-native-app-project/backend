import { PickType } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

export class UpdateUserRequestDto extends PickType(User, [
  'nickname',
  'imagePath',
] as const) {}
