import { RoleRepository, UserRepository } from '@Infra/database/repositories';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { IUserService } from './interfaces';
import { CryptService } from '@Infra/crypt';
import { ApiError } from '@Shared/errors';

@Injectable()
export class UserService implements IUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly crypt: CryptService,
    private readonly roleRepository: RoleRepository,
  ) {}

  public async executeCreateUser(user: CreateUserDto) {
    const { email, name, password, role: userRole } = user;
    const alredyHasEmail = await this.userRepository.getByEmail(email);
    const alredyHasName = await this.userRepository.getByName(name);
    const role = await this.roleRepository.getByName(userRole);

    if (!role)
      throw new ApiError(
        HttpStatus.NOT_FOUND,
        `Role with ID ${userRole} not found!`,
      );

    if (alredyHasEmail || alredyHasName) {
      throw new ApiError(
        HttpStatus.BAD_REQUEST,
        'Email ou senha ja existentes',
      );
    }

    const hashPass = await this.crypt.hash(password, 12);

    await this.userRepository.create({
      email,
      name,
      password: hashPass,
      role: { connect: { id: role.id } },
    });
  }

  public async executeUpdateUser(user: UpdateUserDto, userId: string) {
    const hasUser = await this.userRepository.getById(userId);

    if (hasUser) {
      if (user.password) {
        const hashPass = await this.crypt.hash(user.password, 12);
        user.password = hashPass;
        await this.userRepository.update({
          ...user,
          id: userId,
        });
        return;
      }
      await this.userRepository.update({
        ...user,
        id: userId,
      });
      return;
    }
    throw new ApiError(HttpStatus.BAD_REQUEST, 'Usuario não encontrado');
  }

  public async executeDeleteUser(id: string) {
    const hasUser = await this.userRepository.getById(id);
    if (hasUser) {
      await this.userRepository.delete({ id });
      return;
    }
    throw new ApiError(HttpStatus.BAD_REQUEST, 'Usuario não existe');
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
