import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthNaverService {
  getEmail(token: string) {
    return { email: 'admin@test.com' };
  }
}
