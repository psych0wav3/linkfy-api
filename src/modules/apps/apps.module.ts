import { Module } from '@nestjs/common';
import { AppsController } from './apps.controller';
import { AppsService } from './apps.service';
import { PrismaModule } from '@Infra/database/prisma';
import {
  AppRepository,
  PlatformRepository,
} from '@Infra/database/repositories';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AppsController],
  providers: [AppsService, AppRepository, PlatformRepository, JwtService],
  imports: [PrismaModule],
})
export class AppsModule {}
