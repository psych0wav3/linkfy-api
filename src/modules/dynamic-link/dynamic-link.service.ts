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
import { resolveDynamicLinkDto } from './dtos';
import { join } from 'path';
import { readFileSync } from 'fs';
@Injectable()
export class DynamicLinkService implements IDynamicLinkService {
  constructor(
    private readonly dynamicLinkRepository: DynamicLinkRepository,
    private readonly dynamicLinkAppRepository: DynamicLinkAppRepository,
  ) {}

  public async executeDeleteDynamicLink(id: string): Promise<void> {
    const dynamicLink = await this.dynamicLinkRepository.findByIdAsync({ id });
    if (!dynamicLink)
      throw new ApiError(HttpStatus.NOT_FOUND, 'Dynamic link not found');
    await this.dynamicLinkRepository.deleteAsync({ id });
  }

  public async executeUpdateDynamicLink(data: any, id: string): Promise<void> {
    const dynamicLink = await this.dynamicLinkRepository.findByIdAsync({ id });
    if (!dynamicLink)
      throw new ApiError(HttpStatus.NOT_FOUND, 'Dynamic link not found');
    data.id = id;
    await this.dynamicLinkRepository.updateAsync(data);
  }

  public async executeCreateDynamicLink(data) {
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
    });

    for (const appLink of data.appLinks) {
      await this.dynamicLinkAppRepository.associateAppAsync(
        dynamicLink.id,
        appLink.appId,
        appLink.destination,
        appLink.fallbackUrl,
      );
    }
  }

  public async executeResolveDynamicLink(data: resolveDynamicLinkDto) {
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
