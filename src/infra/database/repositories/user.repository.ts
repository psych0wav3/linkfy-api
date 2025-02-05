import { User, Prisma } from '@prisma/client';
import { IUserRepository } from '@Shared/interfaces/repositories';
import { PrismaService } from '@Infra/database/prisma';
import { ConfigService } from '@nestjs/config';
import { ApiError } from '@Shared/errors';
import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository implements IUserRepository {
  private errorMessage: string;
  constructor(
    private readonly database: PrismaService,
    env: ConfigService,
  ) {
    this.errorMessage =
      env.get('DATABASE_ERROR_MESSAGE') ||
      'We Sorry about that, please try latter';
  }

  async create(user: Prisma.UserCreateInput): Promise<void> {
    try {
      await this.database.user.create({ data: user });
    } catch {
      throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, this.errorMessage);
    }
  }
  async delete(id: Prisma.UserWhereUniqueInput): Promise<void> {
    try {
      await this.database.user.delete({ where: id });
    } catch {
      throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, this.errorMessage);
    }
  }
  async list(): Promise<User[]> {
    try {
      return await this.database.user.findMany();
    } catch {
      throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, this.errorMessage);
    }
  }

  async update(user: Prisma.UserUpdateInput): Promise<void> {
    try {
      await this.database.user.update({
        where: { id: user.id as string },
        data: user,
      });
    } catch {
      throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, this.errorMessage);
    }
  }

  async getByEmail(email: string): Promise<User> {
    try {
      return await this.database.user.findUnique({ where: { email: email } });
    } catch {
      throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, this.errorMessage);
    }
  }
  async getByName(name: string): Promise<User> {
    try {
      return await this.database.user.findFirst({ where: { name: name } });
    } catch {
      throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, this.errorMessage);
    }
  }

  async getById(id: string): Promise<User> {
    try {
      return await this.database.user.findFirst({ where: { id: id } });
    } catch {
      throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, this.errorMessage);
    }
  }
}
