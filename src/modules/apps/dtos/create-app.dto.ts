import { IsOptional, IsString } from 'class-validator';

export class CreateAppDto {
  @IsString()
  name: string;

  @IsString()
  platformId: string;

  @IsOptional()
  @IsString()
  packageName?: string;

  @IsOptional()
  @IsString()
  sha256?: string;

  @IsOptional()
  @IsString()
  bundleId?: string;

  @IsOptional()
  @IsString()
  teamId?: string;

  @IsOptional()
  @IsString()
  baseUrl?: string;
}
