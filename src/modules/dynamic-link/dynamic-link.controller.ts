import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { DynamicLinkService } from './dynamic-link.service';
import { NotAuth, Roles } from '@Shared/decorators';
import { Roles as RolesEnum } from '@Shared/enums';
import {
  CreateDynamicLinkDto,
  ResolveDynamicLinkDto,
  UpadateDynamicLinkDto,
} from './dtos';
import { Request, Response } from 'express';
import { validateOrReject } from 'class-validator';
import { AuthMiddleware, RoleMiddleware } from '@Shared/middlewares';
import { ApiSecurity } from '@nestjs/swagger';

@ApiSecurity('bearer')
@Controller('dynamic-link')
@UseGuards(RoleMiddleware)
@UseGuards(AuthMiddleware)
export class DynamicLinkController {
  constructor(private readonly dynamicLinkService: DynamicLinkService) {}

  @Post()
  @Roles(RolesEnum.Admin, RolesEnum.Editor)
  async createDynamicLink(@Body() dynamicLink: CreateDynamicLinkDto) {
    return this.dynamicLinkService.executeCreateDynamicLink(dynamicLink);
  }

  @Patch(':id')
  @Roles(RolesEnum.Admin, RolesEnum.Editor)
  async updateDynamicLink(
    @Body() dynamicLink: UpadateDynamicLinkDto,
    @Param('id') id: string,
  ) {
    return this.dynamicLinkService.executeUpdateDynamicLink(dynamicLink, {
      id,
    });
  }

  @Delete(':id')
  @Roles(RolesEnum.Admin, RolesEnum.Editor)
  async deleteDynamicLink(@Param('id') id: string) {
    return this.dynamicLinkService.executeDeleteDynamicLink({ id });
  }

  @NotAuth()
  @Get(':slug')
  async resolveDynamicLink(
    @Req() request: Request,
    @Param('slug') slug: string,
    @Res() response: Response,
  ) {
    const data = new ResolveDynamicLinkDto();
    data.host = request?.headers['host'] || '';
    data.userAgent = request?.headers['user-agent'] || '';
    data.slug = slug;
    data.send = (html: string) => response.type('html').send(html);

    await validateOrReject(data);

    return await this.dynamicLinkService.executeResolveDynamicLink(data);
  }

  @Get()
  async listDynamicLink() {
    return await this.dynamicLinkService.executeListDynamicLink();
  }
}
