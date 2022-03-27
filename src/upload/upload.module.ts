import { BadRequestException, Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import path from 'path';
import multerS3 from 'multer-s3';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        storage: multerS3({
          s3: new S3({
            accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
            secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
            region: configService.get('AWS_REGION'),
            endpoint:
              configService.get('NODE_ENV') === 'development'
                ? configService.get('AWS_END_POINT')
                : null,
            s3ForcePathStyle:
              configService.get('NODE_ENV') === 'development' ? true : false,
          }),
          bucket: configService.get('AWS_S3_BUCKET_NAME'),
          acl: 'public-read',
          key: function (req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, `${uuid()}${ext}`);
          },
        }),
        fileFilter: function (req, file, cb) {
          if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(
              new BadRequestException('Only image files are allowed!'),
              false,
            );
          }
          cb(null, true);
        },
        limits: {
          files: 10,
          fileSize: 1024 * 1024,
        },
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
