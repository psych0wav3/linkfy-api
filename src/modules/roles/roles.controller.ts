import {
  Controller,
  Get,
  HttpCode,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';
import { AuthMiddleware, RoleMiddleware } from '@Shared/middlewares';
import { RolesService } from './roles.service';
import { Roles } from '@Shared/decorators';
import { Roles as EnumRoles } from '@Shared/enums';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@ApiSecurity('bearer')
@Controller('roles')
@UseGuards(RoleMiddleware)
@UseGuards(AuthMiddleware)
@UseInterceptors(CacheInterceptor)
export class RolesController {
  constructor(private readonly roleService: RolesService) {}

  @CacheKey('listRoles')
  @CacheTTL(0)
  @Get()
  @Roles(EnumRoles.Admin, EnumRoles.Editor)
  @HttpCode(200)
  async listRoles() {
    return await this.roleService.executeListRoles();
  }
}
