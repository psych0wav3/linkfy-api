import { Module } from '@nestjs/common';
import { DynamicLinkService } from './dynamic-link.service';
import { DynamicLinkController } from './dynamic-link.controller';
import { PrismaModule } from '@Infra/database/prisma';
import {
  AppRepository,
  DynamicLinkAppRepository,
  DynamicLinkRepository,
} from '@Infra/database/repositories';

@Module({
  providers: [
    DynamicLinkService,
    DynamicLinkRepository,
    DynamicLinkAppRepository,
    AppRepository,
  ],
  controllers: [DynamicLinkController],
  imports: [PrismaModule],
})
export class DynamicLinkModule {}
