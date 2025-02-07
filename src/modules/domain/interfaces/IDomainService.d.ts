import { Domain } from '@prisma/client';

export interface IDomainService {
  executeCreateDomain(data): Promise<void>;
  executeListDomains(): Promise<Domain[]>;
  executeUpdateDomain(data, id: string): Promise<void>;
  executeDeleteDomain(id: string): Promise<void>;
}
