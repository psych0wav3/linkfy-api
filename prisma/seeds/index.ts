import { PrismaClient } from '@prisma/client';
import { roleSeed } from './roleSeed';
import { userSeed } from './userSeed';
import { platformTypeSeed } from './platformTypeSeed';
import { appsSeed } from './appsSeed';
import { domainSeed } from './domainSeed';
import { dynamicLinkSeed } from './dynamicLinkSeed';

const prisma = new PrismaClient();

async function main() {
  await roleSeed(prisma);
  await userSeed(prisma);
  await platformTypeSeed(prisma);
  await appsSeed(prisma);
  await domainSeed(prisma);
  await dynamicLinkSeed(prisma);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
