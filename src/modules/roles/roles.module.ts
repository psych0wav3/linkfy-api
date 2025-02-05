import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { PrismaModule } from '@Infra/database/prisma';
import { RoleRepository } from '@Infra/database/repositories';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [RolesService, RoleRepository, JwtService],
  controllers: [RolesController],
  imports: [PrismaModule],
})
export class RolesModule {}
