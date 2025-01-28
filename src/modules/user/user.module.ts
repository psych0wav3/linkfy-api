import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from '@Infra/database/prisma';
import { UserRepository } from '@Infra/database/repositories';

@Module({
  providers: [UserService, UserRepository],
  controllers: [UserController],
  imports: [PrismaModule],
})
export class UserModule {}
