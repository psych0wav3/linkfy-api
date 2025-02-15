import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule, PrismaService } from '@Infra/database/prisma';
import { UserModule } from '@Modules/user/user.module';
import { AuthModule } from '@Modules/auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';
import KeyvRedis from '@keyv/redis';
import { AppsModule } from '@Modules/apps/apps.module';
import { RolesModule } from '@Modules/roles/roles.module';
import { PlatformModule } from '@Modules/platform/platform.module';
import { DomainModule } from '@Modules/domain/domain.module';
import { DynamicLinkModule } from '@Modules/dynamic-link/dynamic-link.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    AuthModule,
    AppsModule,
    PlatformModule,
    RolesModule,
    DomainModule,
    DynamicLinkModule,
    PrismaModule,
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: new KeyvRedis(configService.get<string>('REDIS_CACHE_URL')),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
