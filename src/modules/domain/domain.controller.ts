import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';
import { AuthMiddleware, RoleMiddleware } from '@Shared/middlewares';
import { DomainService } from './domain.service';
import { Roles } from '@Shared/decorators';
import { Roles as RolesEnum } from '@Shared/enums';
import { CreateDomainDto, UpdateDomainDto } from './dtos';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@ApiSecurity('bearer')
@Controller('domain')
@UseGuards(RoleMiddleware)
@UseGuards(AuthMiddleware)
@UseInterceptors(CacheInterceptor)
export class DomainController {
  constructor(private readonly domainService: DomainService) {}

  @Post()
  @Roles(RolesEnum.Admin, RolesEnum.Editor)
  async createUser(@Body() domain: CreateDomainDto) {
    return await this.domainService.executeCreateDomain(domain);
  }

  @Patch(':id')
  @Roles(RolesEnum.Admin, RolesEnum.Editor)
  async updateUser(@Body() domain: UpdateDomainDto, @Param('id') id: string) {
    return await this.domainService.executeUpdateDomain(domain, id);
  }

  @Delete(':id')
  @Roles(RolesEnum.Admin, RolesEnum.Editor)
  async deleteUser(@Param('id') id: string) {
    return await this.domainService.executeDeleteDomain(id);
  }

  @CacheKey('listDomain')
  @CacheTTL(3600000)
  @Get()
  @Roles(RolesEnum.Admin, RolesEnum.Editor, RolesEnum.Viewer)
  async listUsers() {
    return await this.domainService.executeListDomains();
  }
}
