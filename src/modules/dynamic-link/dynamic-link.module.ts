import { Module } from '@nestjs/common';
import { DynamicLinkService } from './dynamic-link.service';
import { DynamicLinkController } from './dynamic-link.controller';
import { PrismaModule } from '@Infra/database/prisma';
import {
  DynamicLinkAppRepository,
  DynamicLinkRepository,
} from '@Infra/database/repositories';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [
    DynamicLinkService,
    DynamicLinkRepository,
    DynamicLinkAppRepository,
    JwtService,
  ],
  controllers: [DynamicLinkController],
  imports: [PrismaModule],
})
export class DynamicLinkModule {}
