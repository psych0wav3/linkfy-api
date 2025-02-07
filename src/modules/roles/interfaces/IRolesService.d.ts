import { Role } from '@prisma/client';

export interface IRolesService {
  executeListRoles(): Promise<Role[]>;
}
