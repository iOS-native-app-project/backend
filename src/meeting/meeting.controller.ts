import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('meeting')
export class MeetingController {
  @Post()
  async getMeeting(@Body() user_id: number) {

  }
}
