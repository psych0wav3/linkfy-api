import { UserRepository } from '@Infra/database/repositories';
import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { IUserService } from './interfaces';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async executeCreateUser(user: CreateUserDto) {
    const { email, name, password } = user;
    await this.userRepository.create({ email, name, password });
  }

  public async executeUpdateUser(user: UpdateUserDto, userId: string) {
    const { email, name, password } = user;
    await this.userRepository.update({ email, name, password, id: userId });
  }
  public async executeDeleteUser(id: string) {
    await this.userRepository.delete({ id });
  }

  public async executeListUsers() {
    const users = await this.userRepository.list();
    const formatedUser = users.map((item) => {
      delete item.password;
      return item;
    });
    return formatedUser;
  }
}
