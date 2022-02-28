import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/repositories/UserRepository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { AuthAppleService } from './social/auth-apple.service';
import { AuthKakaoService } from './social/auth-kakao.service';
import { AuthNaverService } from './social/auth-naver.service';
import { AuthType } from './auth-type.enum';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private readonly authAppleService: AuthAppleService,
    private readonly authKakaoService: AuthKakaoService,
    private readonly authNaverService: AuthNaverService,
  ) { }

  async login(authCredentialsDto: AuthCredentialsDto) {
    const { email } = await this.getEmail(authCredentialsDto);

    const user = await this.userRepository.findUserByEmail(email);

    if (!user) this.userRepository.createUser(email);

    return;
  }

  getEmail(authCredentialsDto: AuthCredentialsDto) {
    const { authType, token } = authCredentialsDto;
    switch (authType) {
      case AuthType.APPLE:
      // return this.authAppleService.getEmail(token);
      case AuthType.KAKAO:
        return this.authKakaoService.getEmail(token);
      case AuthType.NAVER:
        return this.authNaverService.getEmail(token);
      default:
        throw new BadRequestException('The authType is wrong.');
    }
  }
}
