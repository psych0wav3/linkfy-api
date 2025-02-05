import { Role } from '@prisma/client';

export interface IRoleRepository {
  getByName(name: string): Promise<Role>;
}
