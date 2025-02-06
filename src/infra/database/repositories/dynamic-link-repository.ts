import { HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, DynamicLink } from '@prisma/client';
import { IDynamicLinkRepository } from '@Shared/interfaces/repositories';
import { PrismaService } from '../prisma';
import { ConfigService } from '@nestjs/config';
import { ApiError } from '@Shared/errors';

@Injectable()
export class DynamicLinkRepository implements IDynamicLinkRepository {
  errorMessage: string;

  constructor(
    private readonly prisma: PrismaService,
    env: ConfigService,
  ) {
    this.errorMessage =
      env.get<string>('DATABASE_ERROR_MESSAGE') ||
      'We Sorry about that, please try latter';
  }

  public async createAsync(
    data: Prisma.DynamicLinkCreateInput,
  ): Promise<DynamicLink> {
    try {
      return await this.prisma.dynamicLink.create({ data });
    } catch {
      throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, this.errorMessage);
    }
  }
  public async findBySlugAsync(slug: string): Promise<DynamicLink | null> {
    try {
      return await this.prisma.dynamicLink.findFirst({ where: { slug } });
    } catch {
      throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, this.errorMessage);
    }
  }
  public async findAllAsync(): Promise<DynamicLink[]> {
    try {
      return await this.prisma.dynamicLink.findMany();
    } catch {
      throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, this.errorMessage);
    }
  }
}
