import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { AppLinks } from './createDynamicLinkDto';
import { ApiProperty } from '@nestjs/swagger';

export class UpadateDynamicLinkDto {
  @ApiProperty({ example: 'promo123', description: 'Slug of the dynamic link' })
  @IsString()
  slug: string;

  @ApiProperty({
    example: [
      {
        destination: 'linkfy://app',
        fallbackUrl: 'https://play.store/linkfy-app',
      },
    ],
    description: 'Slug of the dynamic link',
  })
  @IsArray()
  @Type(() => AppLinks)
  @ValidateNested({ each: true })
  appLinks: AppLinks[];

  @IsOptional()
  id?: string;
}
