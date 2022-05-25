import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { RecordService } from './record.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { GetUser } from '../auth/auth.decorator';
import { User } from '../user/entities/user.entity';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth('accessToken')
@ApiTags('Record')
@Controller('meeting/:meetingId/record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @ApiOperation({
    summary: '기록 등록',
    description: '기록을 등록합니다.',
  })
  @ApiBody({
    type: CreateRecordDto,
  })
  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @GetUser() { id: userId }: User,
    @Param('meetingId') meetingId: number,
    @Body() createRecordDto: CreateRecordDto,
  ) {
    return this.recordService.create({ createRecordDto, meetingId, userId });
  }

  @ApiOperation({
    summary: '기록 조회',
    description: '년월을 이용하여 기록을 조회합니다.',
  })
  @Get()
  @UseGuards(JwtAuthGuard)
  findByYearAndMonth(
    @GetUser() { id: userId }: User,
    @Param('meetingId') meetingId: number,
    @Query('year') year: number,
    @Query('month') month: number,
  ) {
    return this.recordService.findByYearAndMonth({
      year,
      month,
      meetingId,
      userId,
    });
  }

  @ApiOperation({
    summary: '유저 기록 조회',
    description: '년월을 이용하여 같은 채팅방 유저의 기록을 조회합니다.',
  })
  @Get('/userId/:targetUserId')
  @UseGuards(JwtAuthGuard)
  findUserRecordByAndYearAndMonth(
    @GetUser() { id: userId }: User,
    @Param('meetingId') meetingId: number,
    @Param('targetUserId') targetUserId: number,
    @Query('year') year: number,
    @Query('month') month: number,
  ) {
    return this.recordService.findUserRecordByAndYearAndMonth({
      year,
      month,
      meetingId,
      userId,
      targetUserId,
    });
  }
}
