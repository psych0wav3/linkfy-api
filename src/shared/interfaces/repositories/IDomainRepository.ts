import { Domain, Prisma } from '@prisma/client';

export interface IDomainRepository {
  errorMessage: string;

  createAsync(data: Prisma.DomainCreateInput): Promise<Domain>;
  findByIdAsync(id: string): Promise<Domain | null>;
  findByHostAsync(host: string): Promise<Domain | null>;
  findAllASync(): Promise<Domain[]>;
}
