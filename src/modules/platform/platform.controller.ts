import {
  Controller,
  Get,
  HttpCode,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';
import { Roles } from '@Shared/decorators';
import { Roles as EnumRoles } from '@Shared/enums';
import { AuthMiddleware, RoleMiddleware } from '@Shared/middlewares';
import { PlatformService } from './platform.service';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Controller('platform')
@ApiSecurity('bearer')
@UseGuards(RoleMiddleware)
@UseGuards(AuthMiddleware)
@UseInterceptors(CacheInterceptor)
export class PlatformController {
  constructor(private readonly platformService: PlatformService) {}

  @CacheKey('listPlatforms')
  @CacheTTL(0)
  @Get()
  @Roles(EnumRoles.Admin, EnumRoles.Editor)
  @HttpCode(200)
  public async listPlatforms() {
    return await this.platformService.executeListPlatform();
  }
}
