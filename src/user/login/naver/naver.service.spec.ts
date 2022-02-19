import { Test, TestingModule } from '@nestjs/testing';
import { NaverService } from './naver.service';

describe('NaverService', () => {
  let service: NaverService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NaverService],
    }).compile();

    service = module.get<NaverService>(NaverService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
