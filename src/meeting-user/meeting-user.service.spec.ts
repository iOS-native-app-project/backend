import { Test, TestingModule } from '@nestjs/testing';
import { MeetingUserService } from './meeting-user.service';

describe('MeetingUserService', () => {
  let service: MeetingUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeetingUserService],
    }).compile();

    service = module.get<MeetingUserService>(MeetingUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
