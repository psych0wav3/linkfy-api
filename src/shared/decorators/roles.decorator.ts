import { SetMetadata } from '@nestjs/common';
import { Roles as EnumRoles } from '@Shared/enums';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: EnumRoles[]) => SetMetadata(ROLES_KEY, roles);
