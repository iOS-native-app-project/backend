import { Module } from '@nestjs/common';
import { KakaoModule } from './user/login/kakao/kakao.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), KakaoModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
