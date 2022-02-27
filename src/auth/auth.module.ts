import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthNaverService } from './social/auth-naver.service';
import { AuthAppleService } from './social/auth-apple.service';
import { AuthKakaoService } from './social/auth-kakao.service';
import { UserRepository } from 'src/repositories/UserRepository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    HttpModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthAppleService,
    AuthKakaoService,
    AuthNaverService,
  ],
})
export class AuthModule { }
