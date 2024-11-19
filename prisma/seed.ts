import { PrismaClient } from '@prisma/client';
import { CHALLENGES, USERS } from './mock/challengeMock.js';

const prisma = new PrismaClient();

async function main() {
  //기존 데이터 삭제
  await prisma.user.deleteMany();
  await prisma.challenge.deleteMany();

  // 목 데이터 삽입
  await prisma.user.createMany({
    data: USERS.map(user => ({
      id: user.id,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deleteAt: user.deleteAt,
      name: user.name,
      email: user.email,
      password: user.password,
      salt: user.salt,
      refreshToken: user.refreshToken || null,
      role: user.role,
    })),
    skipDuplicates: true,
  });

  await prisma.challenge.createMany({
    data: CHALLENGES,
    skipDuplicates: true,
  });
}

//데이터베이스와의 연결 종료
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
