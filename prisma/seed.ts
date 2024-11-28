import { PrismaClient } from '@prisma/client';
import FEEDBACKS from '@/prisma/mock/feedbackMock.js';
import RECIPES from '@/prisma/mock/recipeMock.js';
import { CHALLENGES } from './mock/challengeMock.js';
import { CHALLENGE_WORKS, WORK_IMAGES } from './mock/challengeWorkMock.js';
import USERS from './mock/userMock.js';

const prisma = new PrismaClient();

async function main() {
  await prisma.recipe.deleteMany();
  await prisma.feedback.deleteMany();
  await prisma.workImage.deleteMany();
  await prisma.challengeWork.deleteMany();
  await prisma.challenge.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.createMany({
    data: USERS,
    skipDuplicates: true,
  });

  for (const challenge of CHALLENGES) {
    if (!['canceled', 'aborted', 'denied', 'pending'].includes(challenge.status)) {
      await prisma.challenge.create({
        data: {
          ...challenge,
          participants: { connect: { id: challenge.requestUserId } },
        },
      });
    } else {
      await prisma.challenge.create({
        data: {
          ...challenge,
          participants: { connect: [] }, // 또는 participants: undefined
        },
      });
    }
  }
  await prisma.challengeWork.createMany({
    data: CHALLENGE_WORKS,
    skipDuplicates: true,
  });

  await prisma.workImage.createMany({
    data: WORK_IMAGES,
    skipDuplicates: true,
  });

  await prisma.feedback.createMany({
    data: FEEDBACKS,
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
