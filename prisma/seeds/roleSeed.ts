import { PrismaClient } from '@prisma/client';
import { roleIdAdmin, roleIdEditor, roleIdViewer } from './common';

const roles = [
  { name: 'ADMIN', id: roleIdAdmin },
  { name: 'EDITOR', id: roleIdEditor },
  { name: 'VIEWER', id: roleIdViewer },
];

export const roleSeed = async (db_instance: PrismaClient) => {
  for (const role of roles) {
    await db_instance.role.upsert({
      where: { name: role.name },
      update: {},
      create: { id: role.id, name: role.name },
    });
  }

  console.log(
    '🌱✅ Roles Seed inserted successfully into the database! 🚀🎉 \n',
  );
};
