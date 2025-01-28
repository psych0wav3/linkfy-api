import { CanActivate, ExecutionContext, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ApiError } from '@Shared/errors';
import { ConfigService } from '@nestjs/config';

export class AuthMiddleware implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    private readonly env: ConfigService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token)
      throw new ApiError(HttpStatus.UNAUTHORIZED, 'Usuario nao autorizado ');
    try {
      const payload = await this.jwt.verifyAsync(token, {
        secret: this.env.get<string>('JWT_SECRET'),
      });
      request['user'] = payload;
    } catch {
      throw new ApiError(HttpStatus.UNAUTHORIZED, 'Usuario nao autorizado ');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
