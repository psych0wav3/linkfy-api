import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';
import { AuthMiddleware, RoleMiddleware } from '@Shared/middlewares';
import { RolesService } from './roles.service';
import { Roles } from '@Shared/decorators';
import { Roles as EnumRoles } from '@Shared/enums';

@ApiSecurity('bearer')
@Controller('roles')
@UseGuards(RoleMiddleware)
@UseGuards(AuthMiddleware)
export class RolesController {
  constructor(private readonly roleService: RolesService) {}

  @Get()
  @Roles(EnumRoles.Admin, EnumRoles.Editor)
  @HttpCode(200)
  async listRoles() {
    return await this.roleService.executeListRoles();
  }
}
