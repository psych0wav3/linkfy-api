import { PrismaClient } from '@prisma/client';
import { roleSeed } from './roleSeed';
import { userSeed } from './userSeed';

const prisma = new PrismaClient();

async function main() {
  await roleSeed(prisma);
  await userSeed(prisma);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
