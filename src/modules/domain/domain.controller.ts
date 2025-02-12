import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';
import { AuthMiddleware, RoleMiddleware } from '@Shared/middlewares';
import { DomainService } from './domain.service';
import { Roles } from '@Shared/decorators';
import { Roles as RolesEnum } from '@Shared/enums';
import { CreateDomainDto, UpdateDomainDto } from './dtos';

@ApiSecurity('bearer')
@Controller('domain')
@UseGuards(RoleMiddleware)
@UseGuards(AuthMiddleware)
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

  @Get()
  @Roles(RolesEnum.Admin, RolesEnum.Editor, RolesEnum.Viewer)
  async listUsers() {
    return await this.domainService.executeListDomains();
  }
}
