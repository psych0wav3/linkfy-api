import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsEmail, IsString, IsOptional } from 'class-validator';

export class UpdateUserDto implements Partial<User> {
  @IsOptional()
  @ApiProperty({ example: 'John Doe', description: 'Name os thje user' })
  @IsString()
  name?: string;

  @IsOptional()
  @ApiProperty({
    example: 'john@example.com',
    description: 'The email of the user',
  })
  @IsOptional()
  @IsEmail({}, { message: 'Email precisa ser valido' })
  email?: string;

  @IsOptional()
  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  @IsString()
  password?: string;
}
