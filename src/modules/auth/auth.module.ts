import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CryptService } from '@Infra/crypt';
import { PrismaModule } from '@Infra/database/prisma';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  RefreshTokenRepository,
  UserRepository,
} from '@Infra/database/repositories';

@Module({
  providers: [
    AuthService,
    CryptService,
    UserRepository,
    RefreshTokenRepository,
  ],
  controllers: [AuthController],
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (conf: ConfigService) => ({
        secret: conf.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: conf.get<string>('JWT_EXPIRES_IN') || '1h',
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AuthModule {}
