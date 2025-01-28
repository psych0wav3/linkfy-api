import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthMiddleware } from '@Shared/middlewares/Auth.middleware';
import { UserService } from './user.service';
import { ApiParam, ApiSecurity } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from './dtos';

@ApiSecurity('bearer')
@Controller('user')
@UseGuards(AuthMiddleware)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() user: CreateUserDto) {
    return this.userService.executeCreateUser(user);
  }

  @Patch()
  @HttpCode(200)
  async updateUser(@Body() user: UpdateUserDto) {
    return this.userService.executeUpdateUser(user);
  }

  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The ID of the user',
    example: 'cd00c11d-0df4-4184-b750-686993cdcd50',
  })
  @Delete(':id')
  @HttpCode(200)
  async deleteUser(@Param('id') id: string) {
    return this.userService.executeDeleteUser(id);
  }

  @Get()
  @HttpCode(200)
  async listUser() {
    return this.userService.executeListUsers();
  }
}
