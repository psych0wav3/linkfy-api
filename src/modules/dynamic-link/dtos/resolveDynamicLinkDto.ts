import { Response } from 'express';

export class resolveDynamicLinkDto {
  host: string;
  userAgent: string;
  slug: string;
  send: (html: string) => Response;
}
