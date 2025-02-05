import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from '@Infra/database/prisma';
import { RoleRepository, UserRepository } from '@Infra/database/repositories';
import { JwtService } from '@nestjs/jwt';
import { CryptService } from '@Infra/crypt';

@Module({
  imports: [PrismaModule],
  providers: [
    UserService,
    UserRepository,
    JwtService,
    CryptService,
    RoleRepository,
  ],
  controllers: [UserController],
})
export class UserModule {}
