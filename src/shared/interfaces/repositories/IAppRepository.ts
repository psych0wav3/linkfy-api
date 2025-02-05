import { App, Prisma } from '@prisma/client';

export interface IAppRepository {
  errorMessage: string;

  listAsync(): Promise<App[]>;
  deleteAsync(id: Prisma.AppWhereUniqueInput): Promise<void>;
  createAsync(app: Prisma.AppCreateInput): Promise<void>;
  updateAsync(app: Prisma.AppUpdateInput): Promise<void>;
  findByName(name: string): Promise<App>;
  findById(id: string): Promise<App>;
}
