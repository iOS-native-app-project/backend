import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { RecordService } from './record.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { GetUser } from '../auth/auth.decorator';
import { User } from '../user/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Record')
@Controller('meeting/:meetingId/record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@GetUser() user: User, @Body() createRecordDto: CreateRecordDto) {
    return this.recordService.create(createRecordDto, user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@GetUser() user: User, @Param('meetingId') meetingId: number) {
    return this.recordService.findAll(meetingId, user);
  }

  @Get(':recordId')
  @UseGuards(JwtAuthGuard)
  findOne(
    @GetUser() user: User,
    @Param('meetingId') meetingId: number,
    @Param('recordId') recordId: number,
  ) {
    return this.recordService.findOne(meetingId, recordId, user);
  }
}
