import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthNaverService } from './social/auth-naver.service';
import { AuthAppleService } from './social/auth-apple.service';
import { AuthKakaoService } from './social/auth-kakao.service';
import { HttpModule } from '@nestjs/axios';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from 'src/user/repositories/user.repository';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
    TypeOrmModule.forFeature([UserRepository]),
    UserModule,
    HttpModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthAppleService,
    AuthKakaoService,
    AuthNaverService,
    JwtStrategy,
  ],
})
export class AuthModule { }
