import {
  CreateDynamicLinkDto,
  ResolveDynamicLinkDto,
  UpadateDynamicLinkDto,
} from '../dtos';
import { Prisma } from '@prisma/client';

export interface IDynamicLinkService {
  executeCreateDynamicLink(
    data: CreateDynamicLinkDto,
  ): Promise<
    Prisma.DynamicLinkGetPayload<{ include: { apps: true; domain: true } }>[]
  >;
  executeResolveDynamicLink(data: ResolveDynamicLinkDto): Promise<void>;
  executeListDynamicLink(): Promise<Record<string, any>>;
  executeDeleteDynamicLink(
    id: Prisma.DynamicLinkWhereUniqueInput,
  ): Promise<void>;
  executeUpdateDynamicLink(
    data: UpadateDynamicLinkDto,
    id: Prisma.DynamicLinkWhereUniqueInput,
  ): Promise<void>;
}
