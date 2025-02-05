import { IsOptional, IsString } from 'class-validator';

export class UpdateAppDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  platformId?: string;

  @IsString()
  @IsOptional()
  packageName?: string;

  @IsString()
  @IsOptional()
  sha256?: string;

  @IsString()
  @IsOptional()
  bundleId?: string;

  @IsString()
  @IsOptional()
  teamId?: string;

  @IsOptional()
  @IsString()
  baseUrl?: string;
}
