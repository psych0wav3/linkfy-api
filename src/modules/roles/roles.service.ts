import { RoleRepository } from '@Infra/database/repositories';
import { Injectable } from '@nestjs/common';
import { IRolesService } from './interfaces';

@Injectable()
export class RolesService implements IRolesService {
  constructor(private readonly roleRepository: RoleRepository) {}

  public async executeListRoles() {
    return await this.roleRepository.list();
  }
}
