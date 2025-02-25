import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsString,
  IsUrl,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class AppLinks implements Partial<Prisma.DynamicLinkAppCreateInput> {
  @IsUUID()
  appId: string;

  @IsString()
  destination: string;

  @IsUrl()
  fallbackUrl: string;
}

export class CreateDynamicLinkDto {
  @ApiProperty({
    example: 'promo123',
    description: 'Some name to identifier a link',
    type: 'string',
    required: true,
  })
  @IsString()
  slug: string;

  @ApiProperty({
    example: 'b340d6cf-06b2-4ec1-86f9-6de97caaca7f',
    description: 'ID of Domain',
    type: 'string',
    required: true,
  })
  @IsUUID()
  domainId: string;

  @ApiProperty({
    example: 'true',
    description: 'Shoud be listed?',
    type: 'boolean',
    required: true,
  })
  @IsBoolean()
  isListed: boolean;

  @ApiProperty({
    example: [
      {
        appId: 'a05adf8a-3196-4817-b41a-3e2d204e5259',
        destination: 'linkfy://app',
        fallbackUrl: 'http://google.com.br',
      },
    ],
    description: 'Link by app',
    type: 'array',
    required: true,
  })
  @IsArray()
  @Type(() => AppLinks)
  @ValidateNested({ each: true })
  appLinks: AppLinks[];
}
