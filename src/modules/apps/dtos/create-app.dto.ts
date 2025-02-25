import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateAppDto {
  @ApiProperty({
    example: 'LinkfyAndroid',
    description: 'Name of app',
    type: 'string',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '62fd6a02-c5e8-4dbc-8dbe-d279fdcdbe29',
    description: 'platform ID',
    type: 'string',
  })
  @IsString()
  platformId: string;

  @ApiProperty({
    example: 'com.br.linkfy',
    description: 'name of the package',
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
  packageName?: string;

  @ApiProperty({
    example: '86f15442b4fa9a8a9033061d59aae05b364a850f05913edaf5f60df457c43195',
    description: 'Hash sha256 of android app',
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
  sha256?: string;

  @ApiProperty({
    example: 'com.br.linkfy',
    description: 'IOS bundle ID',
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
  bundleId?: string;

  @ApiProperty({
    example: 'WJG45G67',
    description: 'IOS Team ID',
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
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
