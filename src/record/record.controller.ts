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
  ApiOkResponse,
  ApiOperation,
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
  @ApiOkResponse({
    description: '성공',
    schema: {
      example: {
        success: true,
        statusCode: 201,
      },
    },
  })
  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @GetUser() user: User,
    @Param('meetingId') meetingId: number,
    @Body() createRecordDto: CreateRecordDto,
  ) {
    return this.recordService.create(createRecordDto, meetingId, user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@GetUser() user: User, @Param('meetingId') meetingId: number) {
    return this.recordService.findAll(meetingId, user);
  }
}
