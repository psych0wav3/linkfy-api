import { Module } from '@nestjs/common';
import { PlatformService } from './platform.service';
import { PlatformController } from './platform.controller';
import { PrismaModule } from '@Infra/database/prisma';
import { PlatformRepository } from '@Infra/database/repositories';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [PlatformService, PlatformRepository, JwtService],
  controllers: [PlatformController],
  imports: [PrismaModule],
})
export class PlatformModule {}
