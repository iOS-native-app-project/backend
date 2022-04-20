import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/auth.decorator';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/user/entities/user.entity';
import { MeetingCategoryDto } from './dto/search-meeting.dto';
import { MeetingService } from './meeting.service';

@ApiTags('Meeting')
@Controller('meeting')
@UseGuards(JwtAuthGuard)
export class MeetingController {
  constructor(private readonly meetingService: MeetingService) {}
  @ApiOperation({ summary: '모임 첫 화면 API' })
  @Get('/user/:user_id')
  async getMeeting(@GetUser() user: User) {
    return await this.meetingService.getMeeting(user.id);
  }

  @ApiOperation({ summary: '카테고리 검색 API' })
  @ApiBody({ type: MeetingCategoryDto })
  @Post('/category')
  async getMeetingByCategory(
    @GetUser() user: User,
    @Body() category_id: MeetingCategoryDto,
  ) {
    return await this.meetingService.getMeetingByCategory(
      category_id.category_id,
      user.id,
    );
  }

  @ApiOperation({ summary: '검색어 검색 API' })
  @Get('/:user_id/search/:search')
  async getMeetingBySearch(
    @GetUser() user: User,
    @Param('search') search: string,
  ) {
    return await this.meetingService.getMeetingBySearch(search, user.id);
  }

  @ApiOperation({ summary: 'A301: 모임 입장 화면 API' })
  @Get('/:meeting_id')
  async getMeetingById(@Param('meeting_id') meeting_id: number) {
    return await this.meetingService.getMeetingById(meeting_id);
  }

  @ApiOperation({ summary: 'A302: 모임 홈 화면 API' })
  @Get('/home/:meeting_id')
  async getMeetingHome(@Param('meeting_id') meeting_id: number) {
    return await this.meetingService.getMeetingHome(meeting_id);
  }

  @ApiOperation({ summary: 'A302: 유저 신고/추천 API' })
  @Get('/:meeting_id/report/user/:user_id/type/:type')
  async setUserforReport(
    @Param('meeting_id') meeting_id: number,
    @Param('member_id') member_id: number,
    @Param('type') type: number,
  ) {
    return await this.meetingService.setUserforReport(
      meeting_id,
      member_id,
      type,
    );
  }
}
