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
} from '@nestjs/common';
import { DynamicLinkService } from './dynamic-link.service';
import { Roles } from '@Shared/decorators';
import { Roles as RolesEnum } from '@Shared/enums';
import { CreateDynamicLinkDto, UpadateDynamicLinkDto } from './dtos';
import { Request, Response } from 'express';

@Controller('dynamic-link')
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
    return this.dynamicLinkService.executeUpdateDynamicLink(dynamicLink, id);
  }

  @Delete(':id')
  @Roles(RolesEnum.Admin, RolesEnum.Editor)
  async deleteDynamicLink(@Param('id') id: string) {
    return this.dynamicLinkService.executeDeleteDynamicLink(id);
  }

  @Get(':slug')
  async resolveDynamicLink(
    @Req() request: Request,
    @Param('slug') slug: string,
    @Res() response: Response,
  ) {
    const data = {
      host: request?.headers['host'] || '',
      userAgent: request?.headers['user-agent'] || '',
      slug,
      send: (html: string) => response.type('html').send(html),
    };

    return await this.dynamicLinkService.executeResolveDynamicLink(data);
  }
}
