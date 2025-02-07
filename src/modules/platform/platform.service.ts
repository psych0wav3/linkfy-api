import { PlatformRepository } from '@Infra/database/repositories';
import { Injectable } from '@nestjs/common';
import { IPlatformService } from './interfaces';

@Injectable()
export class PlatformService implements IPlatformService {
  constructor(private readonly platformRespository: PlatformRepository) {}

  public async executeListPlatform() {
    return await this.platformRespository.listAsync();
  }
}
