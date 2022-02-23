import { Module } from '@nestjs/common';
import { KakaoModule } from './user/login/kakao/kakao.module';
import { NaverService } from './user/login/naver/naver.service';
import { NaverController } from './user/login/naver/naver.controller';
import { NaverModule } from './user/login/naver/naver.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), KakaoModule, NaverModule],
  controllers: [NaverController],
  providers: [NaverService],
})
export class AppModule {}
