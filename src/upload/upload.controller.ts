import {
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetUser } from 'src/auth/auth.decorator';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/user/entities/user.entity';
import { UploadService } from './upload.service';

@ApiTags('Upload')
@Controller('api/uploads')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @ApiOperation({
    summary: '파일 업로드',
    description: '파일을 업로드 합니다.',
  })
  @ApiCreatedResponse({
    description: '성공',
    schema: {
      example: {
        success: true,
        statusCode: 201,
        data: [
          {
            url: 'http://127.0.0.1:9000/img/7f652a48-5b75-4701-aa55-f98ffb396b44.png',
          },
        ],
      },
    },
  })
  @ApiBearerAuth('accessToken')
  @Post('')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('files', 10))
  uploadFile(@GetUser() user: User, @UploadedFiles() files: any) {
    return this.uploadService.uploadImage(user, files);
  }
}
