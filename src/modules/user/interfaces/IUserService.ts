import { User } from '@prisma/client';
import { CreateUserDto, UpdateUserDto } from '../dtos';

export interface IUserService {
  executeCreateUser(user: CreateUserDto): Promise<void>;
  executeUpdateUser(user: UpdateUserDto, id: string): Promise<void>;
  executeDeleteUser(id: string): Promise<void>;
  executeListUsers(): Promise<Partial<User[]>>;
}
