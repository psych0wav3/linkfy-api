import { Role } from '@prisma/client';

export interface IRoleRepository {
  getByName(name: string): Promise<Role>;
  getById(id: string): Promise<Role>;
  list(): Promise<Role[]>;
}
