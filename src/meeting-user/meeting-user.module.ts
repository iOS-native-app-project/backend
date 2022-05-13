import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeetingUserController } from './meeting-user.controller';
import { MeetingUserService } from './meeting-user.service';
import { MeetingUserRepository } from './repositories/meeting-user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MeetingUserRepository])],
  controllers: [MeetingUserController],
  providers: [MeetingUserService],
  exports: [MeetingUserService],
})
export class MeetingUserModule {}
