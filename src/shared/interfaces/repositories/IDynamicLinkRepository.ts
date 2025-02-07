import { DynamicLink, Prisma } from '@prisma/client';

export interface IDynamicLinkRepository {
  errorMessage: string;

  createAsync(data: Prisma.DynamicLinkCreateInput): Promise<DynamicLink>;
  findBySlugAsync(domainId: string, slug: string): Promise<DynamicLink | null>;
  findAllAsync(): Promise<DynamicLink[]>;
  findByIdAsync(
    id: Prisma.DynamicLinkWhereUniqueInput,
  ): Promise<DynamicLink | null>;
  deleteAsync(id: Prisma.DynamicLinkWhereUniqueInput): Promise<void>;
  updateAsync(data: Prisma.DynamicLinkUpdateInput): Promise<void>;
}
