import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule, PrismaService } from '@Infra/database/prisma';
import { UserModule } from '@Modules/user/user.module';
import { AuthModule } from '@Modules/auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';
import KeyvRedis from '@keyv/redis';
import { AppsModule } from '@Modules/apps/apps.module';
import { RolesModule } from '@Modules/roles/roles.module';
import { PlatformModule } from '@Modules/platform/platform.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    AuthModule,
    AppsModule,
    PlatformModule,
    RolesModule,
    PrismaModule,
    CacheModule.register({
      isGlobal: true,
      stores: new KeyvRedis('redis://localhost:6379'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
