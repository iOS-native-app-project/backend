import { HttpService } from '@nestjs/axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { catchError, map, pluck } from 'rxjs';

@Injectable()
export class AuthKakaoService {
  constructor(private httpService: HttpService) {}

  getUid(access_token: string): Promise<{ uid: string }> {
    const headers = {
      Authorization: `bearer ${access_token}`,
    };

    return this.httpService
      .get('https://kapi.kakao.com/v2/user/me', {
        headers,
      })
      .pipe(
        pluck('data', 'id'),
        map((v) => ({ uid: 'kakao:' + v })),
        catchError(() => {
          throw new UnauthorizedException('Tokens do not match.');
        }),
      )
      .toPromise();
  }
}
