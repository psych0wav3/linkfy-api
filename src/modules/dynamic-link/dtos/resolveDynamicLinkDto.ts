import { IsString } from 'class-validator';
import { Response } from 'express';

export class ResolveDynamicLinkDto {
  @IsString()
  host: string;

  @IsString()
  userAgent: string;

  @IsString()
  slug: string;

  send: (html: string) => Response;
}
