import {
  DynamicLinkAppRepository,
  DynamicLinkRepository,
} from '@Infra/database/repositories';
import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IDynamicLinkService } from './interfaces';
import { ApiError } from '@Shared/errors';
import {
  CreateDynamicLinkDto,
  ResolveDynamicLinkDto,
  UpadateDynamicLinkDto,
} from './dtos';
import { join } from 'path';
import { readFileSync } from 'fs';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@Infra/database/prisma';
@Injectable()
export class DynamicLinkService implements IDynamicLinkService {
  constructor(
    private readonly dynamicLinkRepository: DynamicLinkRepository,
    private readonly dynamicLinkAppRepository: DynamicLinkAppRepository,
    private readonly prisma: PrismaService,
  ) {}

  async executeListDynamicLink(): Promise<Record<string, any>> {
    const list = await this.dynamicLinkRepository.findAllAsync();
    return list.map((item) => {
      const { apps } = item;
      delete item.isListed;
      delete item.apps;
      return { ...item, links: apps };
    });
  }

  public async executeDeleteDynamicLink({
    id,
  }: Prisma.DynamicLinkWhereUniqueInput): Promise<void> {
    const dynamicLink = await this.dynamicLinkRepository.findByIdAsync({ id });
    if (!dynamicLink)
      throw new ApiError(HttpStatus.NOT_FOUND, 'Dynamic link not found');
    await this.dynamicLinkRepository.deleteAsync({ id });
  }

  public async executeUpdateDynamicLink(
    data: UpadateDynamicLinkDto,
    { id }: Prisma.DynamicLinkWhereUniqueInput,
  ): Promise<void> {
    const { appLinks: newAppLinks, slug } = data;
    const dynamicLink = await this.dynamicLinkRepository.findByIdAsync({ id });
    const appLinks =
      await this.dynamicLinkAppRepository.findByDynamicLinkIdAsync(id);

    if (!dynamicLink || !appLinks)
      throw new ApiError(HttpStatus.NOT_FOUND, 'Dynamic link not found');

    const toUpdateAppLinks = newAppLinks.map((item) => {
      const iqual = appLinks.find((_item) => _item.appId === item.appId);
      if (iqual) {
        return {
          id: iqual.id,
          ...item,
        };
      }
    });

    await this.dynamicLinkRepository.updateAsync({ slug, id });
    for (const links of toUpdateAppLinks) {
      await this.dynamicLinkAppRepository.updateAssociationAsync(links);
    }
  }

  public async executeCreateDynamicLink(
    data: CreateDynamicLinkDto,
  ): Promise<
    Prisma.DynamicLinkGetPayload<{ include: { apps: true; domain: true } }>[]
  > {
    const existingLink = await this.dynamicLinkRepository.findBySlugAsync(
      data.domainId,
      data.slug,
    );
    if (existingLink) {
      throw new ConflictException(
        `Dynamic Link with slug "${data.slug}" alredy exist.`,
      );
    }

    const dynamicLink = await this.dynamicLinkRepository.createAsync({
      slug: data.slug,
      domain: { connect: { id: data.domainId } },
      isListed: data.isListed,
    });

    for (const appLink of data.appLinks) {
      await this.dynamicLinkAppRepository.associateAppAsync(
        dynamicLink.id,
        appLink.appId,
        appLink.destination,
        appLink.fallbackUrl,
      );
    }
    return await this.prisma.dynamicLink.findMany({
      where: { id: dynamicLink.id },
      include: { apps: true, domain: true },
    });
  }

  public async executeResolveDynamicLink(data: ResolveDynamicLinkDto) {
    const { host, slug, send, userAgent } = data;

    const userPlatform = this.getUserPlatform(userAgent);

    const dynamicLink = await this.dynamicLinkRepository.findBySlugAsync(
      host,
      slug,
    );

    if (!dynamicLink) {
      throw new NotFoundException('Dynamic link not found');
    }

    const { destination, fallbackUrl } = dynamicLink.apps.find(
      (app) => app.app.platform.name === userPlatform,
    );

    const filePath = join(process.cwd(), 'public', 'index.html');
    let htmlContent = readFileSync(filePath, 'utf8');

    htmlContent = htmlContent.replace('{destination}', destination);
    htmlContent = htmlContent.replace('{fallbackUrl}', fallbackUrl);
    htmlContent = htmlContent.replace('{platform}', userPlatform);

    send(htmlContent);
  }

  private getUserPlatform(userAgent: string) {
    let platform = 'WEB';
    if (/Android/i.test(userAgent)) platform = 'ANDROID';
    if (/iPhone|iPad|iPod/i.test(userAgent)) platform = 'IOS';
    return platform;
  }
}
