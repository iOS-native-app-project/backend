import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginRequestDto } from './dto/login.request.dto';
import { AuthAppleService } from './social/auth-apple.service';
import { AuthKakaoService } from './social/auth-kakao.service';
import { AuthNaverService } from './social/auth-naver.service';
import { AuthType } from './auth-type.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/repositories/user.repository';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/user/entities/user.entity';
import { TokenRequestDto } from './dto/token.request.dto';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private authAppleService: AuthAppleService,
    private authKakaoService: AuthKakaoService,
    private authNaverService: AuthNaverService,
  ) { }

  async login(loginRequestDto: LoginRequestDto) {
    const info = this.getInfo(loginRequestDto);

    // const user = await this.userRepository.findUserByEmail(email);
    // if (!user) this.userRepository.createUser(email);
    return info;
  }

  async logout(user: User) {
    const { refreshToken } = await this.userService.findById(user.id, true);

    if (!refreshToken) throw new UnauthorizedException('not logged in.');

    await this.updateRefreshToken(user, null);
  }

  getInfo(loginRequestDto: LoginRequestDto) {
    const { authType, token } = loginRequestDto;
    switch (authType) {
      case AuthType.APPLE:
        return; //this.authAppleService.getCertified(token);
      case AuthType.KAKAO:
        return; //this.authKakaoService.getCertified(token);
      case AuthType.NAVER:
        return this.authNaverService.getCertified(token);
      default:
        throw new BadRequestException('The authType is wrong.');
    }
  }

  async updateRefreshToken(user: User, token: string | null = null) {
    user.refreshToken = token;
    return await this.userRepository.save(user);
  }

  async token(tokenRequestDto: TokenRequestDto) {
    const { refreshToken } = tokenRequestDto;
    const { id, exp } = this.checkJwtRefreshToken(refreshToken);

    let newRefhreshToken;

    const user = await this.userService.findById(id, true);

    if (user.refreshToken !== refreshToken)
      throw new UnauthorizedException('Invalid or Missing JWT token.');

    const newAccessToken = this.getJwtAccessToken(user);

    if (exp < Math.floor(Date.now() / 1000) + 1 * 24 * 60 * 60) {
      newRefhreshToken = this.getJwtRefreshToken(user);
      await this.updateRefreshToken(user, newRefhreshToken);
    }
    return {
      tokenType: 'bearer',
      accessToken: newAccessToken,
      refhreshToken: newRefhreshToken,
    };
  }

  getJwtAccessToken(user: User) {
    const { id, email, nickName } = user;
    const payload = { id, email, nickName };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_ACCESS_TOKEN_EXPIRESIN')}`,
    });

    return token;
  }

  getJwtRefreshToken(user: User) {
    const { id } = user;
    const payload = { id };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRESIN')}`,
    });

    return token;
  }

  checkJwtRefreshToken = (token: string) => {
    try {
      const jwtToken = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      });

      return jwtToken;
    } catch (error) {
      throw new UnauthorizedException('Invalid or Missing JWT token.');
    }
  };
}
