import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateAppDto {
  @ApiProperty({
    example: '95c1feb0-c01f-4685-8230-d2bd1ccf0bb8',
    description: 'APP ID',
    type: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  id?: string;

  @ApiProperty({
    example: 'Linkfy App',
    description: 'App Name',
    type: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 'b0f5820d-87d0-4997-9c1e-4b5c1109f3c8',
    description: 'ID of platform',
    type: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  platformId?: string;

  @ApiProperty({
    example: 'com.br.linkfy',
    description: 'name of the package',
    type: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  packageName?: string;

  @ApiProperty({
    example: '86f15442b4fa9a8a9033061d59aae05b364a850f05913edaf5f60df457c43195',
    description: 'Hash sha256 of android app',
    type: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  sha256?: string;

  @ApiProperty({
    example: 'com.br.linkfy',
    description: 'IOS bundle ID',
    type: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  bundleId?: string;

  @ApiProperty({
    example: 'WJG45G67',
    description: 'IOS Team ID',
    type: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  teamId?: string;

  @ApiProperty({
    example: 'https://linkfy.com.br',
    description: 'WEB Fallback URL',
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
  baseUrl?: string;
}
