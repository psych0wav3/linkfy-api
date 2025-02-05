import { HttpStatus, Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { IRoleRepository } from '@Shared/interfaces/repositories';
import { PrismaService } from '../prisma';
import { ConfigService } from '@nestjs/config';
import { ApiError } from '@Shared/errors';

@Injectable()
export class RoleRepository implements IRoleRepository {
  private errorMessage: string;
  constructor(
    private readonly prisma: PrismaService,
    env: ConfigService,
  ) {
    this.errorMessage =
      env.get('DATABASE_ERROR_MESSAGE') ||
      'We Sorry about that, please try latter';
  }

  async getByName(name: string): Promise<Role> {
    try {
      return await this.prisma.role.findFirst({ where: { name: name } });
    } catch {
      throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, this.errorMessage);
    }
  }
}
