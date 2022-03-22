import { HttpService } from '@nestjs/axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { catchError, pluck } from 'rxjs';

@Injectable()
export class AuthKakaoService {
  constructor(private httpService: HttpService) {}

  // async validationToken(access_token: string) {
  //   try {
  //     const result = await this.httpService
  //       .get('https://kapi.kakao.com/v1/user/access_token_info', {
  //         headers: {
  //           Authorization: `Bearer ${access_token}`,
  //         },
  //       })
  //       .toPromise();
  //     // .pipe(
  //     //   pluck('data', 'response'),
  //     // );
  //     // .pipe(
  //     //   map(response => response.data),
  //     //   map((result) => result.map(data => data))
  //     // );

  //     console.log(result.data);
  //     return result.data;
  //   } catch (error: any) {
  //     return error.response.data;
  //   }
  // }

  // async getEmail(access_token: string): Promise<{ email: string }> {
  //   try {
  //     const valiToken = await this.validationToken(access_token);
  //     if (valiToken.code !== '200') {
  //       return valiToken;
  //     }

  //     const kakaoUser = await this.httpService
  //       .post<KakaoUser>(
  //         'https://kapi.kakao.com/v2/user/me',
  //         {
  //           headers: {
  //             Authorization: `Bearer ${access_token}`,
  //             'Content-Type': 'application/x-www-form-urlencoded',
  //           },
  //         },
  //         {
  //           params: {
  //             property_keys: ['kakao_account.email'],
  //           },
  //         },
  //       )
  //       .toPromise();

  //     console.log(kakaoUser);
  //     return { email: kakaoUser.data.kakao_account.email };
  //   } catch (error: any) {
  //     return error.response.data;
  //   }
  // }

  getEmail(access_token: string): Promise<{ email: string }> {
    const headers = {
      Authorization: `bearer ${access_token}`,
    };

    return this.httpService
      .get('https://kapi.kakao.com/v2/user/me', {
        headers,
      })
      .pipe(
        pluck('data', 'kakao_account'),
        catchError(() => {
          throw new UnauthorizedException('Tokens do not match.');
        }),
      )
      .toPromise();
  }
}
