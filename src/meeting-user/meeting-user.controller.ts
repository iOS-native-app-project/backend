import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/auth.decorator';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/user/entities/user.entity';
import { ReportUserDto } from './dto/meeting-user.dto';
import { MeetingUserService } from './meeting-user.service';

@ApiTags('Meeting-User')
@Controller('meeting-user')
@ApiBearerAuth('accessToken')
@UseGuards(JwtAuthGuard)
export class MeetingUserController {
  constructor(private readonly meetingUserService: MeetingUserService) {}

  @ApiOperation({ summary: '모임 참여 API' })
  @Get(':meetingId/join')
  async joinMeeting(
    @GetUser() user: User,
    @Param('meetingId') meetingId: number,
  ) {
    return await this.meetingUserService.joinMeeting(user.id, meetingId);
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
    return await this.meetingUserService.setUserforReport(
      meetingId,
      reportUserDto.userId,
      reportUserDto.type,
    );
  }
}
