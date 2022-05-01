import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/auth.decorator';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/user/entities/user.entity';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { MeetingCategoryDto, ReportUserDto } from './dto/meeting.dto';
import { MeetingService } from './meeting.service';

@ApiTags('Meeting')
@Controller('meeting')
@ApiBearerAuth('accessToken')
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
    @Body() categoryId: MeetingCategoryDto,
  ) {
    return await this.meetingService.getMeetingByCategory(
      categoryId.categoryId,
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
  @Get(':meetingId')
  async getMeetingById(@Param('meetingId') meetingId: number) {
    return await this.meetingService.getMeetingById(meetingId);
  }

  @ApiOperation({ summary: 'A302: 모임 홈 화면 API' })
  @Get('home/:meetingId')
  async getMeetingHome(@Param('meetingId') meetingId: number) {
    return await this.meetingService.getMeetingHome(meetingId);
  }

  @ApiOperation({
    summary: 'A302: 유저 신고/추천 API',
    description: 'userId: 상대유저 / type 0: 추천, 1: 신고',
  })
  @ApiBody({ type: ReportUserDto })
  @Post(':meetingId/report')
  async setUserforReport(
    @Param('meetingId') meetingId: number,
    @Body() reportUserDto: ReportUserDto,
  ) {
    return await this.meetingService.setUserforReport(
      meetingId,
      reportUserDto.userId,
      reportUserDto.type,
    );
  }

  @ApiOperation({ summary: 'A304: 멤버 기록 API' })
  @Get(':meetingId/member/:memberId')
  async getMemberRecord(
    @Param('meetingId') meetingId: number,
    @Param('memberId') memberId: number,
  ) {
    return await this.meetingService.getMemberRecord(meetingId, memberId);
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
  @Get(':meetingId/join')
  async joinMeeting(
    @GetUser() user: User,
    @Param('meetingId') meetingId: number,
  ) {
    return await this.meetingService.joinMeeting(user.id, meetingId);
  }
}
