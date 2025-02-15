import { PlatformType } from '@prisma/client';

export interface IPlatformRepository {
  errorMessage: string;

  findByNameAsync(name: string): Promise<PlatformType>;
  fingByIdAsync(id: string): Promise<PlatformType>;
  listAsync(): Promise<PlatformType[]>;
}
