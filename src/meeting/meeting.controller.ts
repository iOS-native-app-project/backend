import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/auth.decorator';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/user/entities/user.entity';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { CheckPasswordDto, MeetingCategoryDto } from './dto/meeting.dto';
import { MeetingService } from './meeting.service';

@ApiTags('Meeting')
@Controller('meeting')
@ApiBearerAuth('accessToken')
@UseGuards(JwtAuthGuard)
export class MeetingController {
  constructor(private readonly meetingService: MeetingService) {}

  @ApiOperation({ summary: 'A200: 메인홈 화면 API' })
  @Get('main')
  async getMainMeeting(@GetUser() user: User) {
    return await this.meetingService.getMainMeeting(user.id);
  }

  @ApiOperation({ summary: 'A200: 추천 모임' })
  @Get('main/recommend')
  async recommendMeeting() {
    return await this.meetingService.recommendMeeting();
  }

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

  @ApiOperation({ summary: 'A302: 모임 홈 화면 API' })
  @Get(':meetingId/home')
  async getMeetingHome(
    @GetUser() user: User,
    @Param('meetingId') meetingId: number,
  ) {
    return await this.meetingService.getMeetingHome(user.id, meetingId);
  }

  @ApiOperation({ summary: '멤버별 달성률' })
  @Get(':meetingId/member/rate')
  async getMemberRate(
    @GetUser() user: User,
    @Param('meetingId') meetingId: number,
  ) {
    return await this.meetingService.calMemberRate(user.id, meetingId);
  }

  @ApiOperation({ summary: '모임 전체 달성률' })
  @Get(':meetingId/rate')
  async getMeetingRate(
    @GetUser() user: User,
    @Param('meetingId') meetingId: number,
  ) {
    return await this.meetingService.calMeetingRate(user.id, meetingId);
  }

  @ApiOperation({ summary: '나의 달성률' })
  @Get(':meetingId/my/rate')
  async getMyRate(
    @GetUser() user: User,
    @Param('meetingId') meetingId: number,
  ) {
    return await this.meetingService.calMyRate(user.id, meetingId);
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

  @ApiOperation({ summary: '비밀번호 검증 API' })
  @ApiBody({ type: CheckPasswordDto })
  @Post(':meetingId/check/password')
  async validatePassword(
    @Param('meetingId') meetingId: number,
    @Body('password') password: string,
  ) {
    return await this.meetingService.validatePassword(meetingId, password);
  }

  @ApiOperation({ summary: '모임 삭제 API' })
  @Get('delete')
  async deleteMeeting(
    @GetUser() user: User,
    @Param('meetingId') meetingId: number,
  ) {
    return await this.meetingService.deleteMeeging(user.id, meetingId);
  }
}
