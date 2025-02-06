import { Test, TestingModule } from '@nestjs/testing';
import { DynamicLinkAppController } from './dynamic-link-app.controller';

describe('DynamicLinkAppController', () => {
  let controller: DynamicLinkAppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DynamicLinkAppController],
    }).compile();

    controller = module.get<DynamicLinkAppController>(DynamicLinkAppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
