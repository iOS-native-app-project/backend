import { HttpService } from '@nestjs/axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { catchError, map, pluck } from 'rxjs';

@Injectable()
export class AuthNaverService {
  constructor(private httpService: HttpService) {}

  getCertified(token: string) {
    const headers = {
      Authorization: `bearer ${token}`,
    };

    return this.httpService
      .get('https://openapi.naver.com/v1/nid/me', {
        headers,
      })
      .pipe(
        pluck('data', 'response'),
        catchError(() => {
          throw new UnauthorizedException('Tokens do not match.');
        }),
      )
      .toPromise();
  }
}
