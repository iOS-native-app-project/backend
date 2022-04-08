import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MeetingService } from './meeting.service';

@Controller('meeting')
export class MeetingController {
  constructor(private readonly meetingService: MeetingService) { }
  @Get('/user/:user_id')
  async getMeeting(@Param('user_id') user_id: number) {
    return await this.meetingService.getMeeting(user_id);
  }

  @Get('/user/:user_id/category')
  async getMeetingByCategory(
    @Param('user_id') user_id: number,
    @Body('category_id') category_id: number[]
  ) {
    return await this.meetingService.getMeetingByCategory(category_id, user_id);
  }

  @Get('/user/:user_id/search/:search')
  async getMeetingBySearch(
    @Param('user_id') user_id: number,
    @Param('search') search: string
  ) {
    return await this.meetingService.getMeetingBySearch(search, user_id);
  }

  @Get('/user/:user_id/own')
  async getMeetingByUserId(
    @Param('user_id') user_id: number,
  ) {
    return await this.meetingService.getMeetingByUserId(user_id);
  }
}
