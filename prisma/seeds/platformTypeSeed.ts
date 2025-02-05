import { PrismaClient } from '@prisma/client';

const platforms = [
  { id: '4c198026-c6f6-48bb-ae6a-378b2aa94296', name: 'ANDROID' },
  { id: '85f9fcb3-6a94-49a3-b332-70deb2902c9f', name: 'WEB' },
  { id: '736cfc80-d1ca-4b72-bd1a-960946a765a6', name: 'IOS' },
];

export const platformTypeSeed = async (db_instance: PrismaClient) => {
  for (const platform of platforms) {
    await db_instance.platformType.upsert({
      where: { name: platform.name },
      update: {},
      create: { id: platform.id, name: platform.name },
    });
  }
  console.log(
    '🌱✅ PlatformTypes Seed inserted successfully into the database! 🚀🎉 \n',
  );
};
