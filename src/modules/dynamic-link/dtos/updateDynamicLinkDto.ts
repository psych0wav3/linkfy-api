import { IsString } from 'class-validator';

export class UpadateDynamicLinkDto {
  @IsString()
  slug: string;

  @IsString()
  domainId: string;
}
