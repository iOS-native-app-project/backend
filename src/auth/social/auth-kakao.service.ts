import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthKakaoService {
  constructor(private httpService: HttpService) { }

  async validationToken(access_token: string) {
    const user = await this.httpService.get('https://kapi.kakao.com/v1/user/access_token_info', {
      'headers': {
        Authorization: `Bearer ${access_token}`,
      }
    });
    return user;
  }

  async getUserInfo(access_token: string) {
    const user = await this.httpService.post('https://kapi.kakao.com/v2/user/me',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
      {
        params: {
          property_keys: ["kakao_account.email"]
        },
      });
    return user;
  }


}
