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

  async fingByIdAsync(id: string): Promise<PlatformType> {
    try {
      return await this.prisma.platformType.findUnique({ where: { id: id } });
    } catch {
      throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, this.errorMessage);
    }
  }
}
