import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Domain, Prisma } from '@prisma/client';
import { IDomainRepository } from '@Shared/interfaces/repositories';
import { PrismaService } from '../prisma';
import { ApiError } from '@Shared/errors';

@Injectable()
export class DomainRepository implements IDomainRepository {
  errorMessage: string;

  constructor(
    env: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    this.errorMessage =
      env.get<string>('DATABASE_ERROR_MESSAGE') ||
      'We Sorry about that, please try latter';
  }

  public async deleteAsync(id: string): Promise<void> {
    try {
      await this.prisma.domain.delete({ where: { id } });
    } catch {
      throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, this.errorMessage);
    }
  }

  public async updateAsync(data: Prisma.DomainUpdateInput): Promise<void> {
    try {
      await this.prisma.domain.update({
        where: { id: data.id as string },
        data: data,
      });
    } catch {
      throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, this.errorMessage);
    }
  }

  public async createAsync(data: Prisma.DomainCreateInput): Promise<Domain> {
    try {
      return await this.prisma.domain.create({ data });
    } catch {
      throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, this.errorMessage);
    }
  }

  public async findByIdAsync(id: string): Promise<Domain | null> {
    try {
      return await this.prisma.domain.findUnique({ where: { id } });
    } catch {
      throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, this.errorMessage);
    }
  }

  public async findByHostAsync(host: string): Promise<Domain | null> {
    try {
      return await this.prisma.domain.findFirst({ where: { host } });
    } catch {
      throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, this.errorMessage);
    }
  }

  public async findAllASync(): Promise<Domain[]> {
    try {
      return await this.prisma.domain.findMany();
    } catch {
      throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, this.errorMessage);
    }
  }
}
