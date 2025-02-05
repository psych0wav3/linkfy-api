import { PrismaService } from '@Infra/database/prisma';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    @Inject() private readonly prisma: PrismaService,
  ) {}
  async getHello(): Promise<void> {}
}
