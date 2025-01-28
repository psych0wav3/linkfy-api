import { RefreshToken, Prisma } from '@prisma/client';

export interface IRefreshTokenRepository {
  create(refresh_token: { token: string; userId: string }): Promise<void>;
  delete(id: Prisma.RefreshTokenWhereUniqueInput): Promise<void>;
  getByToken(token: string): Promise<RefreshToken | null>;
}
