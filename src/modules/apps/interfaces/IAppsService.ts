import { App } from '@prisma/client';
import { CreateAppDto, UpdateAppDto } from '../dtos';

export interface IAppsService {
  executeCreateApp(app: CreateAppDto): Promise<void>;
  executeListApps(): Promise<App[]>;
  executeUpdateApp(app: UpdateAppDto, appId: string): Promise<void>;
  executeDeleteApp(id: string): Promise<void>;
}
