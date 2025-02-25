import { DynamicLink, Prisma } from '@prisma/client';

export interface IDynamicLinkRepository {
  errorMessage: string;

  createAsync(data: Prisma.DynamicLinkCreateInput): Promise<DynamicLink>;
  findBySlugAsync(domainId: string, slug: string): Promise<DynamicLink | null>;
  findAllAsync(): Promise<
    Prisma.DynamicLinkGetPayload<{ include: { apps: true; domain: true } }>[]
  >;
  findByIdAsync(
    id: Prisma.DynamicLinkWhereUniqueInput,
  ): Promise<DynamicLink | null>;
  deleteAsync(id: Prisma.DynamicLinkWhereUniqueInput): Promise<void>;
  updateAsync(data: Prisma.DynamicLinkUpdateInput): Promise<void>;
}
