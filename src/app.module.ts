import { Module } from '@nestjs/common';
import { KakaoModule } from './user/login/kakao/kakao.module';
import { NaverService } from './user/login/naver/naver.service';
import { NaverController } from './user/login/naver/naver.controller';
import { NaverModule } from './user/login/naver/naver.module';

@Module({
  imports: [KakaoModule, NaverModule],
  controllers: [NaverController],
  providers: [NaverService],
})
export class AppModule {}
