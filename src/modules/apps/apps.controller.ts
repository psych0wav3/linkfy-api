import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiParam, ApiSecurity } from '@nestjs/swagger';
import { AuthMiddleware, RoleMiddleware } from '@Shared/middlewares';
import { AppsService } from './apps.service';
import { Roles } from '@Shared/decorators';
import { Roles as EnumRoles } from '@Shared/enums';
import { CreateAppDto, UpdateAppDto } from './dtos';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@ApiSecurity('bearer')
@Controller('apps')
@UseGuards(RoleMiddleware)
@UseGuards(AuthMiddleware)
@UseInterceptors(CacheInterceptor)
export class AppsController {
  constructor(private readonly appsService: AppsService) {}

  @Post()
  @Roles(EnumRoles.Admin)
  async createApp(@Body() app: CreateAppDto) {
    return await this.appsService.executeCreateApp(app);
  }

  @CacheKey('listApps')
  @CacheTTL(360000)
  @Get()
  @Roles(EnumRoles.Admin, EnumRoles.Editor)
  async listApps() {
    return await this.appsService.executeListApps();
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The user ID',
    example: 'cd00c11d-0df4-4184-b750-686993cdcd50',
  })
  @HttpCode(200)
  @Roles(EnumRoles.Admin)
  async deleteApp(@Param('id') id: string) {
    return await this.appsService.executeDeleteApp(id);
  }

  @Patch(':id')
  @HttpCode(200)
  @Roles(EnumRoles.Admin)
  async updateApp(@Body() app: UpdateAppDto, @Param('id') id: string) {
    return await this.appsService.executeUpdateApp(app, id);
  }
}
