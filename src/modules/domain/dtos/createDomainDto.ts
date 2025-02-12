import { ApiProperty } from '@nestjs/swagger';
import { Domain } from '@prisma/client';
import { IsString } from 'class-validator';

export class CreateDomainDto implements Partial<Domain> {
  @ApiProperty({ example: 'Jhon Doe', description: 'Name of domain' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'https | http | app', description: 'Scheme of URL' })
  @IsString()
  scheme?: string;

  @ApiProperty({ example: 'jhon.com.br', description: 'Scheme of URL' })
  @IsString()
  host?: string;
}
