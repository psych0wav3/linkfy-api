import { Module } from '@nestjs/common';
import { DynamicLinkService } from './dynamic-link.service';
import { DynamicLinkController } from './dynamic-link.controller';

@Module({
  providers: [DynamicLinkService],
  controllers: [DynamicLinkController]
})
export class DynamicLinkModule {}
