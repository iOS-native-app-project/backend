import { HttpService } from '@nestjs/axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { catchError, pluck } from 'rxjs';

@Injectable()
export class AuthNaverService {
  constructor(private httpService: HttpService) {}

  getEmail(access_token: string): Promise<{ email: string }> {
    const headers = {
      Authorization: `bearer ${access_token}`,
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
