import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserRequestDto } from './dto/create-user.requset.dto';
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
}
