import { IsString } from 'class-validator';

export class CreateDynamicLinkDto {
  @IsString()
  slug: string;

  @IsString()
  domainId: string;
}
