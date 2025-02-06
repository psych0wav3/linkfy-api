import { DynamicLink, Prisma } from '@prisma/client';

export interface IDynamicLinkRepository {
  errorMessage: string;

  createAsync(data: Prisma.DynamicLinkCreateInput): Promise<DynamicLink>;
  findBySlugAsync(slug: string): Promise<DynamicLink | null>;
  findAllAsync(): Promise<DynamicLink[]>;
}
