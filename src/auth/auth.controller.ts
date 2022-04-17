import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { GetUser } from './auth.decorator';
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login.request.dto';
import { TokenRequestDto } from './dto/token.request.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: '로그인',
    description: '로그인하여 토큰을 발급합니다.',
  })
  @ApiBody({
    type: LoginRequestDto,
  })
  @ApiOkResponse({
    description: '성공',
    schema: {
      example: {
        success: true,
        statusCode: 201,
        data: {
          tokenType: 'bearer',
          accessToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyQGRvbWFpbi5jb20iLCJuYW1lIjoi7ZmN6ri464-ZIiwicGhvbmUiOiIwMTAtMDAwMC0wMDAwIiwiaWF0IjoxNjQ2NjcwMTY4LCJleHAiOjE2NDY2NzE5Njh9.Wcld42AkPKwgEf0IZdIMjfGTRJURJfDXeP5K1LNJjDY',
          refreshToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ2NjcwMTY4LCJleHAiOjE2NDcyNzQ5Njh9.-6Z46UA9l3Dzj7iTS4VPpAuI_t2EhvMnFoMK2TTDoWs',
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: '가입정보가 없습니다.',
  })
  @ApiUnauthorizedResponse({
    description: '토큰이 잘못되었습니다.',
  })
  @Post('login')
  login(@Body() loginRequestDto: LoginRequestDto) {
    return this.authService.login(loginRequestDto);
  }

  @ApiOperation({
    summary: '로그아웃',
    description: '저장된 Refresh Token을 삭제합니다.',
  })
  @ApiOkResponse({
    description: '성공',
    schema: {
      example: {
        success: true,
        statusCode: 200,
      },
    },
  })
  @ApiBearerAuth('accessToken')
  @HttpCode(200)
  @Post('/logout')
  @UseGuards(JwtAuthGuard)
  logout(@GetUser() user: User) {
    return this.authService.logout(user);
  }

  @ApiOperation({
    summary: '토큰 재발급',
    description:
      'RefreshToken을 이용하여 AccessToken을 재발급합니다. RefreshToken의 기간이 1일 이하라면 함께 재발급 됩니다.',
  })
  @ApiBody({
    type: TokenRequestDto,
  })
  @ApiOkResponse({
    description: '성공',
    schema: {
      example: {
        success: true,
        statusCode: 201,
        data: {
          tokenType: 'bearer',
          accessToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyQGRvbWFpbi5jb20iLCJuYW1lIjoi7ZmN6ri464-ZIiwicGhvbmUiOiIwMTAtMDAwMC0wMDAwIiwiaWF0IjoxNjQ2NjcwNzg4LCJleHAiOjE2NDY2NzI1ODh9.w6NhUqMsmtpbJiH9p-wAUA6_MlHXHGD4c5jUtB3nen4',
          refhreshToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ2NjcwNzg4LCJleHAiOjE2NDcyNzU1ODh9.P0JiS8qeQfhnRka-Myaf6AJvBRPbHMHBH2JPbClEwLE',
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: '토큰이 잘못 되었습니다.',
  })
  @Post('/token')
  token(@Body() tokenRequestDto: TokenRequestDto) {
    return this.authService.token(tokenRequestDto);
  }
}
