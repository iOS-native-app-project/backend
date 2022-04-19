import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/auth.decorator';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/user/entities/user.entity';
import { MeetingService } from './meeting.service';

@ApiTags('meeting')
@Controller('meeting')
export class MeetingController {
  constructor(private readonly meetingService: MeetingService) {}
  @ApiOperation({ summary: '모임 첫 화면' })
  // @UseGuards(JwtAuthGuard)
  @Get('/user/:user_id')
  async getMeeting(
    // @GetUser() user: User
    @Param('user_id') user_id: number,
  ) {
    return await this.meetingService.getMeeting(user_id);
  }

  @ApiOperation({ summary: '카테고리 검색' })
  @Post('/category')
  async getMeetingByCategory(
    // @GetUser() user: User,
    @Param('user_id') user_id: number,
    @Body('category_id') category_id: number[],
  ) {
    return await this.meetingService.getMeetingByCategory(category_id, user_id);
  }

  @ApiOperation({ summary: '검색어 검색' })
  @Get('/:user_id/search/:search')
  async getMeetingBySearch(
    // @GetUser() user: User,
    @Param('user_id') user_id: number,
    @Param('search') search: string,
  ) {
    return await this.meetingService.getMeetingBySearch(search, user_id);
  }

  @ApiOperation({ summary: '모임 입장' })
  @Get('/:meeting_id')
  async getMeetingById(@Param('meeting_id') meeting_id: number) {
    return await this.meetingService.getMeetingById(meeting_id);
  }
}
