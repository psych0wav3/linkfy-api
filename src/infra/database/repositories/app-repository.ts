import { HttpStatus, Injectable } from '@nestjs/common';
import { App, Prisma } from '@prisma/client';
import { IAppRepository } from '@Shared/interfaces/repositories';
import { PrismaService } from '../prisma';
import { ApiError } from '@Shared/errors';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppRepository implements IAppRepository {
  public errorMessage: string;

  constructor(
    private readonly prisma: PrismaService,
    env: ConfigService,
  ) {
    this.errorMessage =
      env.get<string>('DATABASE_ERROR_MESSAGE') ||
      'We Sorry about that, please try latter';
  }

  async findByName(name: string): Promise<App> {
    try {
      return await this.prisma.app.findFirst({ where: { name: name } });
    } catch {
      throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, this.errorMessage);
    }
  }

  async findById(id: string): Promise<App> {
    try {
      return await this.prisma.app.findUnique({ where: { id: id } });
    } catch {
      throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, this.errorMessage);
    }
  }

  async listAsync(): Promise<App[]> {
    try {
      return await this.prisma.app.findMany();
    } catch {
      throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, this.errorMessage);
    }
  }
  async deleteAsync(id: Prisma.AppWhereUniqueInput): Promise<void> {
    try {
      await this.prisma.app.delete({ where: { id: id.id } });
    } catch {
      throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, this.errorMessage);
    }
  }
  async createAsync(app: Prisma.AppCreateInput): Promise<void> {
    try {
      await this.prisma.app.create({ data: app });
    } catch (error) {
      console.log(error);
      throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }
  async updateAsync(app: Prisma.AppUpdateInput): Promise<void> {
    try {
      await this.prisma.app.update({
        where: { id: app.id as string },
        data: app,
      });
    } catch {
      throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, this.errorMessage);
    }
  }
}
