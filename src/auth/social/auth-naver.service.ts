import { HttpService } from '@nestjs/axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { catchError, map, pluck } from 'rxjs';

@Injectable()
export class AuthNaverService {
  constructor(private httpService: HttpService) {}

  getUid(access_token: string): Promise<{ uid: string }> {
    const headers = {
      Authorization: `bearer ${access_token}`,
    };

    return this.httpService
      .get('https://openapi.naver.com/v1/nid/me', {
        headers,
      })
      .pipe(
        pluck('data', 'response', 'id'),
        map((v) => ({ uid: 'naver:' + v })),
        catchError(() => {
          throw new UnauthorizedException('Tokens do not match.');
        }),
      )
      .toPromise();
  }
}
