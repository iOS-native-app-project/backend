import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { KakaoUser } from '../dto/kakao-user.dto';

@Injectable()
export class AuthKakaoService {
  constructor(private httpService: HttpService) { }

  async validationToken(access_token: string) {
    try {
      const user = await this.httpService.get('https://kapi.kakao.com/v1/user/access_token_info', {
        'headers': {
          Authorization: `Bearer ${access_token}`,
        }
      }).toPromise();

      console.log(user.data);
      return user.data;

    } catch (error) {
      throw error;
    }
  }

  async getEmail(access_token: string): Promise<{ email: string }> {
    console.log(access_token);
    try {
      this.validationToken(access_token);

      const user = await this.httpService.post<KakaoUser>('https://kapi.kakao.com/v2/user/me',
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
        }).toPromise();

      console.log(user.data);

      return { email: user.data.kakao_account.email };

    } catch (error) {
      throw error;
    }
  }


}
