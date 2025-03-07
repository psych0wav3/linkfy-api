import { HttpStatus, Injectable } from '@nestjs/common';
import { PlatformType } from '@prisma/client';
import { IPlatformRepository } from '@Shared/interfaces/repositories';
import { PrismaService } from '../prisma';
import { ApiError } from '@Shared/errors';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PlatformRepository implements IPlatformRepository {
  errorMessage: string;

  constructor(
    private readonly prisma: PrismaService,
    env: ConfigService,
  ) {
    this.errorMessage =
      env.get<string>('DATABASE_ERROR_MESSAGE') ||
      'We Sorry about that, please try latter';
  }
  async findByNameAsync(name: string): Promise<PlatformType> {
    try {
      return await this.prisma.platformType.findFirst({
        where: { name },
      });
    } catch {
      throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, this.errorMessage);
    }
  }
  async listAsync(): Promise<PlatformType[]> {
    try {
      return await this.prisma.platformType.findMany();
    } catch {
      throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, this.errorMessage);
    }
  }

  async fingByIdAsync(id: string): Promise<PlatformType> {
    try {
      return await this.prisma.platformType.findUnique({ where: { id: id } });
    } catch {
      throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, this.errorMessage);
    }
  }
}
