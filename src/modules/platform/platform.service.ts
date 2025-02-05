import { PlatformRepository } from '@Infra/database/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PlatformService {
  constructor(private readonly platformRespository: PlatformRepository) {}

  public async executeListPlatform() {
    return await this.platformRespository.listAsync();
  }
}
