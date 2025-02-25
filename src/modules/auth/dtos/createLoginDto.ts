import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

const ERROR_TEXT = 'Email ou senha invalidos';

export class CreateLoginDto {
  @ApiProperty({
    example: 'jhon@linkfy.com.br',
    description: 'email',
    required: true,
    type: 'string',
  })
  @IsEmail({}, { message: ERROR_TEXT })
  public email: string;

  @ApiProperty({
    example: 'SomePassword',
    description: 'Password',
    required: true,
    type: 'string',
  })
  @IsString({ message: ERROR_TEXT })
  public password: string;
}
