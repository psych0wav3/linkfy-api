import { Request } from 'express';

export interface IDynamicLinkService {
  executeCreateDynamicLink(data): Promise<void>;
  executeResolveDynamicLink(request: Request, slug: string): Promise<string>;
  executeDeleteDynamicLink(id: string): Promise<void>;
  executeUpdateDynamicLink(data, id: string): Promise<void>;
}
