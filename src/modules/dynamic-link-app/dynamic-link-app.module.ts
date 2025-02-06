import { Module } from '@nestjs/common';
import { DynamicLinkAppService } from './dynamic-link-app.service';
import { DynamicLinkAppController } from './dynamic-link-app.controller';

@Module({
  providers: [DynamicLinkAppService],
  controllers: [DynamicLinkAppController]
})
export class DynamicLinkAppModule {}
