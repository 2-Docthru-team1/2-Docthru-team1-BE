import { PrismaClient } from '@prisma/client';
import { CHALLENGES, USERS } from './mock/challengeMock.js';

const prisma = new PrismaClient();

async function main() {
  // 기존 데이터 삭제
  await prisma.user.deleteMany();
  await prisma.challenge.deleteMany();

  // 사용자 데이터 삽입 (관계형 필드 제외)
  for (const user of USERS) {
    await prisma.user.create({
      data: {
        id: user.id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        deleteAt: user.deleteAt,
        salt: user.salt,
        name: user.name,
        email: user.email,
        password: user.password,
        refreshToken: user.refreshToken,
        role: user.role,
      },
    });
  }

  // 챌린지 데이터 삽입
  for (const challenge of CHALLENGES) {
    await prisma.challenge.create({
      data: {
        id: challenge.id,
        createdAt: challenge.createdAt,
        updatedAt: challenge.updatedAt,
        deleteAt: challenge.deleteAt,
        title: challenge.title,
        description: challenge.description,
        status: challenge.status,
        deadline: challenge.deadline,
        isHidden: challenge.isHidden,
        imageUrl: challenge.imageUrl,
        imageUrl2: challenge.imageUrl2,
        embedUrl: challenge.embedUrl,
        mediaType: challenge.mediaType,
        requestUser: {
          connect: { id: challenge.requestUserId },
        },
      },
    });
  }

  // 사용자 데이터 업데이트 (requests 연결)
  for (const user of USERS) {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        requests: {
          connect: user.requests.map((requestId: string) => ({ id: requestId })),
        },
      },
    });
  }
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
