import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthNaverService } from './social/auth-naver.service';
import { AuthAppleService } from './social/auth-apple.service';
import { AuthKakaoService } from './social/auth-kakao.service';
import { UserRepository } from 'src/user/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthAppleService,
    AuthKakaoService,
    AuthNaverService,
  ],
})
export class AuthModule {}
