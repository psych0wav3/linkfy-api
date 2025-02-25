import { PrismaClient } from '@prisma/client';

const domains = [
  {
    id: '5524e581-b933-4fba-a9c0-2237b27648cf',
    name: 'Dev',
    scheme: 'https',
    host: 'hml.linkfy.com.br',
  },
  {
    id: '69f8e538-b746-4f1c-bb6e-6492e193d9e8',
    name: 'Prod',
    scheme: 'https',
    host: 'linkfy.com.br',
  },
];

export const domainSeed = async (db_instance: PrismaClient) => {
  for (const domain of domains) {
    await db_instance.domain.upsert({
      where: { name: domain.name },
      update: {},
      create: {
        id: domain.id,
        host: domain.host,
        name: domain.name,
        scheme: domain.scheme,
      },
    });
  }
  console.log(
    '🌱✅ Domain Seed inserted successfully into the database! 🚀🎉 \n',
  );
};
