import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MeetingService } from './meeting.service';

@Controller('meeting')
export class MeetingController {
  constructor(private readonly meetingService: MeetingService) { }
  @Get('/user/:user_id')
  async getMeeting(@Param() user_id: number) {
    await this.meetingService.getMeeting(user_id);
  }

  @Get('/user/:user_id/category/:category_id')
  async getMeetingByCategory(
    @Param('user_id') user_id: number,
    @Param('category_id') category_id: number
  ) {
    await this.meetingService.getMeetingByCategory(category_id, user_id);
  }

  @Get('/user/:user_id/search/:search')
  async getMeetingBySearch(
    @Param('user_id') user_id: number,
    @Param('search') search: string
  ) {
    await this.meetingService.getMeetingBySearch(search, user_id);
  }
}
