import { Response } from 'express';
import { resolveDynamicLinkDto } from '../dtos';

export interface IDynamicLinkService {
  executeCreateDynamicLink(data): Promise<void>;
  executeResolveDynamicLink(
    data: resolveDynamicLinkDto,
    response: Response,
  ): Promise<void>;
  executeDeleteDynamicLink(id: string): Promise<void>;
  executeUpdateDynamicLink(data, id: string): Promise<void>;
}
