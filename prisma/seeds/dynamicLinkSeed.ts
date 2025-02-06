import { PrismaClient } from '@prisma/client';

const dynamicLinks = [
  {
    id: '9a1713d1-3a6b-46e0-bae2-c5e5af2825fa',
    domainId: '5524e581-b933-4fba-a9c0-2237b27648cf',
    slug: 'sku468796',
  },
];

export const dynamicLinkSeed = async (db_instance: PrismaClient) => {
  for (const dynamicLink of dynamicLinks) {
    await db_instance.dynamicLink.upsert({
      where: { slug: dynamicLink.slug },
      update: {},
      create: {
        slug: dynamicLink.slug,
        domainId: dynamicLink.domainId,
        id: dynamicLink.id,
      },
    });
  }
  console.log(
    '🌱✅ Dynamic Links Seed inserted successfully into the database! 🚀🎉 \n',
  );
};
