import { RoleRepository } from '@Infra/database/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RolesService {
  constructor(private readonly roleRepository: RoleRepository) {}

  public async executeListRoles() {
    return await this.roleRepository.list();
  }
}
