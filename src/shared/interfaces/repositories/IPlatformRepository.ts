import { PlatformType } from '@prisma/client';

export interface IPlatformRepository {
  errorMessage: string;

  fingByIdAsync(id: string): Promise<PlatformType>;
}
