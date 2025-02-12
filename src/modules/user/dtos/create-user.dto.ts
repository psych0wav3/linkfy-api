import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto implements Partial<User> {
  @ApiProperty({ example: 'John Doe', description: 'Name of the user' })
  @IsString()
  name?: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'The email of the user',
  })
  @IsEmail({}, { message: 'Email precisa ser valido' })
  email?: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  @IsString()
  password?: string;

  @IsString()
  roleId?: string;
}
