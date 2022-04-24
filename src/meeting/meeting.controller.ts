import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/auth.decorator';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/user/entities/user.entity';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { MeetingCategoryDto } from './dto/search-meeting.dto';
import { MeetingService } from './meeting.service';

@ApiTags('Meeting')
@Controller('meeting')
@UseGuards(JwtAuthGuard)
export class MeetingController {
  constructor(private readonly meetingService: MeetingService) {}

  @ApiOperation({ summary: 'A300: 모임 첫 화면 API' })
  @Get('')
  async getMeeting(@GetUser() user: User) {
    return await this.meetingService.getMeeting(user.id);
  }

  @ApiOperation({ summary: 'A300: 카테고리 검색 API' })
  @ApiBody({ type: MeetingCategoryDto })
  @Post('category')
  async getMeetingByCategory(
    @GetUser() user: User,
    @Body() category_id: MeetingCategoryDto,
  ) {
    return await this.meetingService.getMeetingByCategory(
      category_id.category_id,
      user.id,
    );
  }

  @ApiOperation({ summary: 'A300: 검색어 검색 API' })
  @Get('search/:search')
  async getMeetingBySearch(
    @GetUser() user: User,
    @Param('search') search: string,
  ) {
    return await this.meetingService.getMeetingBySearch(search, user.id);
  }

  @ApiOperation({ summary: 'A301: 모임 입장 화면 API' })
  @Get(':meeting_id')
  async getMeetingById(@Param('meeting_id') meeting_id: number) {
    return await this.meetingService.getMeetingById(meeting_id);
  }

  @ApiOperation({ summary: 'A302: 모임 홈 화면 API' })
  @Get('home/:meeting_id')
  async getMeetingHome(@Param('meeting_id') meeting_id: number) {
    return await this.meetingService.getMeetingHome(meeting_id);
  }

  @ApiOperation({
    summary: 'A302: 유저 신고/추천 API',
    description: 'member_id: 상대유저 / type 0: 추천, 1: 신고',
  })
  @Get(':meeting_id/report/member/:member_id/type/:type')
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

  @ApiOperation({ summary: 'A304: 멤버 기록 API' })
  @Get(':meeting_id/member/:member_id')
  async getMemberRecord(
    @Param('meeting_id') meeting_id: number,
    @Param('member_id') member_id: number,
  ) {
    return await this.meetingService.getMemberRecord(meeting_id, member_id);
  }

  @ApiOperation({ summary: 'A303: 모임 개설 API' })
  @ApiBody({ type: CreateMeetingDto })
  @Post('')
  async createMeeting(
    @GetUser() user: User,
    @Body() createMeetingDto: CreateMeetingDto,
  ) {
    return await this.meetingService.createMeeting(user.id, createMeetingDto);
  }

  @ApiOperation({ summary: '모임 참여 API' })
  @Get(':meeting_id/join')
  async joinMeeting(
    @GetUser() user: User,
    @Param('meeting_id') meeting_id: number,
  ) {
    return await this.meetingService.joinMeeting(user.id, meeting_id);
  }
}
