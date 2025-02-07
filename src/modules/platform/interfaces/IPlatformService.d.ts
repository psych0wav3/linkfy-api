import { PlatformType } from '@prisma/client';

export interface IPlatformService {
  executeListPlatform(): Promise<PlatformType[]>;
}
