import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';
import { Roles } from '@Shared/decorators';
import { Roles as EnumRoles } from '@Shared/enums';
import { AuthMiddleware, RoleMiddleware } from '@Shared/middlewares';
import { PlatformService } from './platform.service';

@Controller('platform')
@ApiSecurity('bearer')
@UseGuards(RoleMiddleware)
@UseGuards(AuthMiddleware)
export class PlatformController {
  constructor(private readonly platformService: PlatformService) {}

  @Get()
  @Roles(EnumRoles.Admin, EnumRoles.Editor)
  @HttpCode(200)
  public async listPlatforms() {
    return await this.platformService.executeListPlatform();
  }
}
