import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { MeetingDetailService } from './meeting-detail.service';

@ApiTags('Meeting Detail')
@Controller('meeting-detail')
@UseGuards(JwtAuthGuard)
export class MeetingDetailController {
  constructor(private readonly meetingDetailService: MeetingDetailService) {}

  @ApiOperation({ summary: 'A304: 멤버 기록 API' })
  @Get('category')
  async getMemberRecord(
    @Param('meeting_id') meeting_id: number,
    @Param('member_id') member_id: number,
  ) {
    return await this.meetingDetailService.getMemberRecord(
      meeting_id,
      member_id,
    );
  }
}
