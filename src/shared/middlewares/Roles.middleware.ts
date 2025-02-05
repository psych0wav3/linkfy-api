import { PrismaService } from '@Infra/database/prisma';
import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators';

import { ApiError } from '../errors';

@Injectable()
export class RoleMiddleware implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass],
    );

    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user)
      throw new ApiError(
        HttpStatus.UNAUTHORIZED,
        'User is not abble to procced',
      );

    const userWithRole = await this.prisma.user.findUnique({
      where: { id: user.id },
      include: { role: true },
    });
    if (!userWithRole || !requiredRoles.includes(userWithRole.role.name)) {
      throw new ApiError(
        HttpStatus.METHOD_NOT_ALLOWED,
        'Insufficient Permission',
      );
    }
    return true;
  }
}
