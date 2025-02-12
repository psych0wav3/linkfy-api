import { Module } from '@nestjs/common';
import { DomainService } from './domain.service';
import { DomainController } from './domain.controller';
import { PrismaModule } from '@Infra/database/prisma';
import { DomainRepository } from '@Infra/database/repositories';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [DomainService, DomainRepository, JwtService],
  controllers: [DomainController],
  imports: [PrismaModule],
})
export class DomainModule {}
