import { DomainRepository } from '@Infra/database/repositories';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ApiError } from '@Shared/errors';
import { IDomainService } from './interfaces';

@Injectable()
export class DomainService implements IDomainService {
  constructor(private readonly domainRepository: DomainRepository) {}

  public async executeUpdateDomain(data: any, id: string): Promise<void> {
    const domain = await this.domainRepository.findByIdAsync(id);
    if (!domain) throw new ApiError(HttpStatus.NOT_FOUND, 'Domain not found!');
    data.id = id;
    await this.domainRepository.updateAsync(data);
  }

  public async executeDeleteDomain(id: string): Promise<void> {
    const domain = await this.domainRepository.findByIdAsync(id);
    if (!domain) throw new ApiError(HttpStatus.NOT_FOUND, 'Domain not found!');
    await this.domainRepository.deleteAsync(id);
  }

  public async executeCreateDomain(data) {
    const domain = await this.domainRepository.findByHostAsync(data.host);
    if (domain) {
      throw new ApiError(HttpStatus.BAD_GATEWAY, 'Domain alredy exist');
    }
    await this.domainRepository.createAsync(data);
  }

  public async executeListDomains() {
    return await this.domainRepository.findAllASync();
  }
}
