import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KakaoModule } from './user/login/kakao/kakao.module';
import { NaverService } from './user/login/naver/naver.service';
import { NaverController } from './user/login/naver/naver.controller';
import { NaverModule } from './user/login/naver/naver.module';

@Module({
  imports: [KakaoModule, NaverModule],
  controllers: [AppController, NaverController],
  providers: [AppService, NaverService],
})
export class AppModule { }
