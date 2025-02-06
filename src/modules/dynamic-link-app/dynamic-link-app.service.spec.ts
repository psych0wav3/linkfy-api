import { Test, TestingModule } from '@nestjs/testing';
import { DynamicLinkAppService } from './dynamic-link-app.service';

describe('DynamicLinkAppService', () => {
  let service: DynamicLinkAppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DynamicLinkAppService],
    }).compile();

    service = module.get<DynamicLinkAppService>(DynamicLinkAppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
