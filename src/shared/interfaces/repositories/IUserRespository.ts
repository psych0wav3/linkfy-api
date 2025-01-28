import { User, Prisma } from '@prisma/client';

export interface IUserRepository {
  create(user: Prisma.UserCreateInput): Promise<void>;
  delete(id: Prisma.UserWhereUniqueInput): Promise<void>;
  list(): Promise<User[]>;
  update(user: Prisma.UserUpdateInput): Promise<void>;
  getByEmail(email: string): Promise<User>;
}
