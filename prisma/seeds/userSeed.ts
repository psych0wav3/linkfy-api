import { PrismaClient } from '@prisma/client';

import { roleIdAdmin, roleIdEditor, roleIdViewer } from './common';

const users = [
  {
    id: 'b1629dac-cb0d-42ec-9737-ba02fc3db777',
    name: 'Bob Singer',
    email: 'bob-s@linkfy.com',
    password: '$2b$12$8X4yFlU6MqaBj2XokWp7BONHr8VIeAWLMGbbT/FQ4AEg5ZtHnke22', //test123
    roleId: roleIdAdmin,
  },
  {
    id: 'aedb9b97-8a8d-4dd7-adcb-9a201865bf98',
    name: 'Dean Winchester',
    email: 'dean.w@linkfy.com.br',
    password: '$2b$12$o6E83k4PoBO/xtHd19qxuucQhDopHVKFAOqE/ZSNOPP8hrkJ5Z1MG', //test1234
    roleId: roleIdEditor,
  },
  {
    id: 'f9a8bfb9-7c6b-44cc-9594-625bdd96c637',
    name: 'Sam Winchester',
    email: 'sam.w@linkfy.com.br',
    password: '$2b$12$ehoA6a2V/OFqGlGbDi4XGuXekswYGtBOkuqOl6Y9jE5/YzGczYpMS', //test12345
    roleId: roleIdViewer,
  },
];

export const userSeed = async (db_instance: PrismaClient) => {
  for (const user of users) {
    await db_instance.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        id: user.id,
        email: user.email,
        name: user.name,
        password: user.password,
        roleId: user.roleId,
      },
    });
  }
  console.log(
    '🌱✅ User Seed inserted successfully into the database! 🚀🎉 \n',
  );
};
