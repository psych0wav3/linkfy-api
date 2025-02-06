import { DynamicLinkApp } from '@prisma/client';

export interface IDynamicLinkAppRepository {
  errorMessage: string;

  associateAppAsync(
    dynamicLinkId: string,
    appId: string,
    destination: string,
    fallbackUrl?: string,
  ): Promise<DynamicLinkApp>;

  findByDinamicLinkIdAsync(dynamicLinkId: string): Promise<DynamicLinkApp[]>;
}
