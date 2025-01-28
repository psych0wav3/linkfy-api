import {
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ApiError } from '@Shared/errors';
import { CryptService } from '@Infra/crypt';
import { JwtService } from '@nestjs/jwt';
import {
  RefreshTokenRepository,
  UserRepository,
} from '@Infra/database/repositories';
import { IAuthService } from './interfaces';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private readonly refreshRepository: RefreshTokenRepository,
    private readonly userRepository: UserRepository,
    private readonly crypt: CryptService,
    private readonly jwt: JwtService,
  ) {}

  public async executeCreateLogin(
    email: string,
    password: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    try {
      const isCached = await this.cache.get(`session:${email}`);
      if (!isCached) {
        const user = await this.userRepository.getByEmail(email);
        if (!user) {
          throw 'E-mail ou senha invalidos';
        } else {
          const isValidPass = await this.crypt.compare(password, user.password);
          if (isValidPass) {
            const access_token = await this.jwt.signAsync(user);
            const refresh_token = await this.jwt.signAsync(user, {
              expiresIn: '7d',
            });
            await this.refreshRepository.create({
              token: refresh_token,
              userId: user.id,
            });
            this.cache.set(
              `session:${user.email}`,
              {
                access_token,
                refresh_token,
              },
              600000,
            );
            return { access_token, refresh_token };
          } else {
            throw new UnauthorizedException();
          }
        }
      } else {
        return isCached as { access_token: string; refresh_token: string };
      }
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new ApiError(HttpStatus.UNAUTHORIZED, '');
      }
      throw new ApiError(HttpStatus.NOT_FOUND, error);
    }
  }

  public async executeRefreshToken(refresh_token: string) {
    const validToken = await this.jwt.verifyAsync(refresh_token);
    const savedToken = await this.refreshRepository.getByToken(refresh_token);
    if (validToken || savedToken) {
      const user = await this.userRepository.getByEmail(validToken.email);
      delete user.password;
      const access_token = await this.jwt.signAsync(user);
      const refresh_token = await this.jwt.signAsync(user, {
        expiresIn: '7d',
      });
      await this.refreshRepository.delete({ id: savedToken.id });
      await this.refreshRepository.create({
        token: refresh_token,
        userId: user.id,
      });
      await this.cache.del(`session:${user.email}`);
      await this.cache.set(
        `session:${user.email}`,
        { access_token, refresh_token },
        600000,
      );
      return { access_token, refresh_token };
    }
    throw new UnauthorizedException();
  }
}
