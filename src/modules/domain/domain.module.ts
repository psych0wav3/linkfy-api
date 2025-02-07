import { Module } from '@nestjs/common';
import { DomainService } from './domain.service';
import { DomainController } from './domain.controller';
import { PrismaModule } from '@Infra/database/prisma';
import { DomainRepository } from '@Infra/database/repositories';

@Module({
  providers: [DomainService, DomainRepository],
  controllers: [DomainController],
  imports: [PrismaModule],
})
export class DomainModule {}
