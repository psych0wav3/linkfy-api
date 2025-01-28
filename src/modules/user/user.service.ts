import { UserRepository } from '@Infra/database/repositories';
import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dtos';

// TODO: criar as interfaces do servico

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async executeCreateUser(user: CreateUserDto) {
    const { email, name, password } = user;
    await this.userRepository.create({ email, name, password });
  }
  public async executeUpdateUser(user: UpdateUserDto) {
    const { email, name, password } = user;
    await this.userRepository.update({ email, name, password });
  }
  public async executeDeleteUser(id: string) {
    await this.userRepository.delete({ id });
  }
  public async executeListUsers() {}
}
