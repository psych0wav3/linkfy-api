import { DomainRepository } from '@Infra/database/repositories';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ApiError } from '@Shared/errors';
import { IDomainService } from './interfaces';
import { CreateDomainDto, UpdateDomainDto } from './dtos';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class DomainService implements IDomainService {
  constructor(
    private readonly domainRepository: DomainRepository,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}

  public async executeUpdateDomain(
    data: UpdateDomainDto,
    id: string,
  ): Promise<void> {
    const domain = await this.domainRepository.findByIdAsync(id);
    if (!domain) throw new ApiError(HttpStatus.NOT_FOUND, 'Domain not found!');
    data.id = id;
    await this.domainRepository.updateAsync(data);
    await this.cache.del('listDomain');
  }

  public async executeDeleteDomain(id: string): Promise<void> {
    const domain = await this.domainRepository.findByIdAsync(id);
    if (!domain) throw new ApiError(HttpStatus.NOT_FOUND, 'Domain not found!');
    await this.domainRepository.deleteAsync(id);
    await this.cache.del('listDomain');
  }

  public async executeCreateDomain(data: CreateDomainDto) {
    const domain = await this.domainRepository.findByHostAsync(data.host);
    if (domain) {
      throw new ApiError(HttpStatus.BAD_GATEWAY, 'Domain alredy exist');
    }
    const { name, host, scheme } = data;
    await this.domainRepository.createAsync({ host, name, scheme });
    await this.cache.del('listDomain');
  }

  public async executeListDomains() {
    return await this.domainRepository.findAllASync();
  }
}
