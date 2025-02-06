import { HttpStatus, Injectable } from '@nestjs/common';
import { DynamicLinkApp } from '@prisma/client';
import { IDynamicLinkAppRepository } from '@Shared/interfaces/repositories';
import { PrismaService } from '../prisma';
import { ConfigService } from '@nestjs/config';
import { ApiError } from '@Shared/errors';

@Injectable()
export class DynamicLinkAppRepository implements IDynamicLinkAppRepository {
  errorMessage: string;

  constructor(
    private readonly prisma: PrismaService,
    env: ConfigService,
  ) {
    this.errorMessage =
      env.get<string>('DATABASE_ERROR_MESSAGE') ||
      'We Sorry about that, please try latter';
  }
  associateAppAsync(
    dynamicLinkId: string,
    appId: string,
    destination: string,
    fallbackUrl?: string,
  ): Promise<DynamicLinkApp> {
    try {
      return this.prisma.dynamicLinkApp.create({
        data: { dynamicLinkId, appId, destination, fallbackUrl },
      });
    } catch {
      throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, this.errorMessage);
    }
  }
  findByDinamicLinkIdAsync(dynamicLinkId: string): Promise<DynamicLinkApp[]> {
    try {
      return this.prisma.dynamicLinkApp.findMany({ where: { dynamicLinkId } });
    } catch {
      throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, this.errorMessage);
    }
  }
}
