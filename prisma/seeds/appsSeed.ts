import { PrismaClient } from '@prisma/client';

const apps = [
  {
    id: 'e8c33069-a6b8-4907-b7a1-69389b7e7242',
    name: 'DotzPaymentAndroid',
    platformId: '4c198026-c6f6-48bb-ae6a-378b2aa94296',
    packageName: 'br.com.dotzpay',
    sha256: '4bfd4e880aa867f282a6667c308fd3bedd7f0d525af52bfd29840dc23e8968a5',
    bundleId: '',
    teamId: '',
    baseUrl: '',
  },
  {
    id: 'c56ebd00-603c-44a7-931f-ed555bc650d9',
    name: 'DotzPaymentsIOS',
    platformId: '85f9fcb3-6a94-49a3-b332-70deb2902c9f',
    packageName: '',
    sha256: '',
    bundleId: 'br.com.dotz.pay',
    teamId: 'WCRSFNJH',
    baseUrl: '',
  },
  {
    id: 'b8f05721-821d-44db-aace-ef7acfd564f0',
    name: 'DotzPaymentsWeb',
    platformId: '736cfc80-d1ca-4b72-bd1a-960946a765a6',
    packageName: '',
    sha256: '',
    bundleId: '',
    teamId: '',
    baseUrl: 'https://dotz.com.br',
  },
];

export const appsSeed = async (db_instance: PrismaClient) => {
  for (const app of apps) {
    await db_instance.app.upsert({
      where: { id: app.id },
      update: {},
      create: app,
    });
  }
  console.log(
    '🌱✅ Apps Seed inserted successfully into the database! 🚀🎉 \n',
  );
};
