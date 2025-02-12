import { ApiProperty } from '@nestjs/swagger';
import { Domain } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';

export class UpdateDomainDto implements Partial<Domain> {
  @IsString()
  @IsOptional()
  id?: string;

  @ApiProperty({ example: 'Jhon Doe', description: 'Name of domain' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'https | http | app', description: 'Scheme of URL' })
  @IsString()
  @IsOptional()
  scheme?: string;

  @ApiProperty({ example: 'jhon.com.br', description: 'Scheme of URL' })
  @IsString()
  @IsOptional()
  host?: string;
}
