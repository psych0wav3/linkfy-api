import { IsEmail, IsString } from 'class-validator';

const ERROR_TEXT = 'Email ou senha invalidos';

export class CreateLoginDto {
  @IsEmail({}, { message: ERROR_TEXT })
  public email: string;

  @IsString({ message: ERROR_TEXT })
  public password: string;
}
