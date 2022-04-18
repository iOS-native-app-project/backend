import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetUser } from 'src/auth/auth.decorator';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CreateUserRequestDto } from './dto/create-user.requset.dto';
import { UpdateUserRequestDto } from './dto/update-user.request.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: '회원가입',
    description: '회원가입을 합니다.',
  })
  @ApiBody({
    type: CreateUserRequestDto,
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
  @Post('')
  createUser(@Body() createUserRequestDto: CreateUserRequestDto) {
    return this.userService.createUser(createUserRequestDto);
  }

  @ApiOperation({
    summary: '내 정보',
    description: '내 정보를 호출합니다.',
  })
  @ApiOkResponse({
    description: '성공',
    schema: {
      example: {
        success: true,
        statusCode: 200,
        data: {
          id: 1,
          authType: 'NAVER',
          email: 'user@jaksim.app',
          nickname: null,
          imagePath: null,
          refreshToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ2NDI5NTc0LCJleHAiOjE2NDY1MTU5NzR9.y0laz-HyxDPkV8LXxeGitO6bddcBt_vhBA8RekEIozk',
        },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('accessToken')
  @Get('')
  readUser(@GetUser() user: User) {
    return this.userService.findById(user.id);
  }

  @ApiOperation({
    summary: '내 정보 변경',
    description: '내 정보를 변경합니다.',
  })
  @ApiBody({
    type: UpdateUserRequestDto,
  })
  @ApiOkResponse({
    description: '성공',
    schema: {
      example: {
        success: true,
        statusCode: 200,
        data: {
          id: 1,
          authType: 'NAVER',
          email: 'user@jaksim.app',
          nickname: null,
          imagePath: null,
          refreshToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ2NDI5NTc0LCJleHAiOjE2NDY1MTU5NzR9.y0laz-HyxDPkV8LXxeGitO6bddcBt_vhBA8RekEIozk',
        },
      },
    },
  })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @Patch('')
  updateUser(
    @Body() updateUserRequestDto: UpdateUserRequestDto,
    @GetUser() user: User,
  ) {
    return this.userService.updateUser(updateUserRequestDto, user);
  }
}
