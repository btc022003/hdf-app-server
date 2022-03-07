import { PrismaClient } from '@prisma/client';
import { encodePwd } from '../src/utils/tools';
const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.manager.upsert({
    where: {
      userName: 'admin',
    },
    update: {
      password: encodePwd('admin'),
    },
    create: {
      userName: 'admin',
      password: encodePwd('admin'),
    },
  });
  console.log(admin);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
