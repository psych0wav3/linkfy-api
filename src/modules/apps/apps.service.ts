import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IAppsService } from './interfaces';
import { App } from '@prisma/client';
import { CreateAppDto, UpdateAppDto } from './dtos';
import {
  AppRepository,
  PlatformRepository,
} from '@Infra/database/repositories';
import { ApiError } from '@Shared/errors';

@Injectable()
export class AppsService implements IAppsService {
  constructor(
    private readonly appRepository: AppRepository,
    private readonly platformRepository: PlatformRepository,
  ) {}

  public async executeCreateApp(app: CreateAppDto): Promise<void> {
    const appAlredyExist = await this.appRepository.findByName(app.name);

    if (!appAlredyExist) {
      const platform = await this.platformRepository.fingByIdAsync(
        app.platformId,
      );
      if (platform) {
        delete app.platformId;
        await this.appRepository.createAsync({
          ...app,
          platform: { connect: { id: platform.id } },
        });
      } else {
        throw new NotFoundException('Platform not found with ID provide');
      }
    } else {
      throw new ConflictException('Alredy exist an App with that name');
    }
  }

  public async executeListApps(): Promise<App[]> {
    return await this.appRepository.listAsync();
  }

  public async executeUpdateApp(
    app: UpdateAppDto,
    appId: string,
  ): Promise<void> {
    const hasApp = await this.appRepository.findById(appId);
    if (hasApp) {
      app.id = hasApp.id;
      await this.appRepository.updateAsync(app);
      return;
    }
    throw new ApiError(HttpStatus.NOT_FOUND, 'App with ID provide not found');
  }

  public async executeDeleteApp(id: string): Promise<void> {
    const app = await this.appRepository.findById(id);
    if (app) {
      await this.appRepository.deleteAsync({ id: id });
      return;
    }
    throw new ApiError(HttpStatus.NOT_FOUND, 'App with ID provide not found');
  }
}
