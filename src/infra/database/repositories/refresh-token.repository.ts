import { PrismaService } from '@Infra/database/prisma';
import { IRefreshTokenRepository } from '@Shared/interfaces/repositories';
import { Prisma, RefreshToken } from '@prisma/client';
import { ApiError } from '@Shared/errors';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RefreshTokenRepository implements IRefreshTokenRepository {
  private errorMessage: string;

  constructor(
    private readonly database: PrismaService,
    env: ConfigService,
  ) {
    this.errorMessage =
      env.get('DATABASE_ERROR_MESSAGE') ||
      'We Sorry about that, please try latter';
  }
  async create(refresh_token: {
    token: string;
    userId: string;
  }): Promise<void> {
    try {
      await this.database.refreshToken.create({
        data: {
          token: refresh_token.token,
          user: { connect: { id: refresh_token.userId } },
        },
      });
    } catch {
      throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, this.errorMessage);
    }
  }
  async delete(id: Prisma.RefreshTokenWhereUniqueInput): Promise<void> {
    try {
      await this.database.refreshToken.delete({ where: id });
    } catch {
      throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, this.errorMessage);
    }
  }
  async getByToken(token: string): Promise<RefreshToken | null> {
    try {
      return await this.database.refreshToken.findFirst({
        where: { token: token },
      });
    } catch {
      throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, this.errorMessage);
    }
  }
  async deleteByUserId(userId: string): Promise<void> {
    try {
      await this.database.refreshToken.deleteMany({
        where: { userId: userId },
      });
    } catch {
      throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, this.errorMessage);
    }
  }
}
