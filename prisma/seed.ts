import { PrismaClient } from '@prisma/client';
import RECIPES from '@/prisma/mock/recipeMock.js';
import { CHALLENGES } from './mock/challengeMock.js';
import { CHALLENGE_WORKS, WORK_IMAGES } from './mock/challengeWorkMock.js';
import USERS from './mock/userMock.js';

const prisma = new PrismaClient();

async function main() {
  // 기존 데이터 삭제
  await prisma.recipe.deleteMany();
  await prisma.workImage.deleteMany();
  await prisma.challengeWork.deleteMany();
  await prisma.challenge.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.createMany({
    data: USERS,
    skipDuplicates: true,
  });

  await prisma.challenge.createMany({
    data: CHALLENGES,
    skipDuplicates: true,
  });

  await prisma.challengeWork.createMany({
    data: CHALLENGE_WORKS,
    skipDuplicates: true,
  });
  await prisma.workImage.createMany({
    data: WORK_IMAGES,
    skipDuplicates: true,
  });

  await prisma.recipe.createMany({
    data: RECIPES,
    skipDuplicates: true,
  });
}

// 데이터베이스 연결 종료
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
