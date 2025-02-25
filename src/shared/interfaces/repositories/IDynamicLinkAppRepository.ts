import { DynamicLinkApp, Prisma } from '@prisma/client';

export interface IDynamicLinkAppRepository {
  errorMessage: string;

  associateAppAsync(
    dynamicLinkId: string,
    appId: string,
    destination: string,
    fallbackUrl?: string,
  ): Promise<DynamicLinkApp>;

  findByDynamicLinkIdAsync(dynamicLinkId: string): Promise<DynamicLinkApp[]>;
  updateAssociationAsync(data: Prisma.DynamicLinkAppUpdateInput): Promise<void>;
}
