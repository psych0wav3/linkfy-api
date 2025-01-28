import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from '@Infra/database/prisma';
import { UserRepository } from '@Infra/database/repositories';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule],
  providers: [UserService, UserRepository, JwtService],
  controllers: [UserController],
})
export class UserModule {}
