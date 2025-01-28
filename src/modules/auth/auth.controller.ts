import { Body, Controller, HttpCode, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateLoginDto, RefreshTokenDto } from './dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(200)
  async createLogin(@Body() login: CreateLoginDto) {
    return await this.authService.executeCreateLogin(
      login.email,
      login.password,
    );
  }

  @Patch()
  @HttpCode(200)
  async refreshToken(@Body() token: RefreshTokenDto) {
    return await this.authService.executeRefreshToken(token.refresh_token);
  }
}
