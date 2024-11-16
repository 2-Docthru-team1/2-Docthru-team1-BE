import { PrismaClient } from '@prisma/client';
import { postgresDatabaseUrl } from '../configs/postgres.config.js';

const connectionOption = { datasourceUrl: postgresDatabaseUrl };

// prismaClient를 선언해두고 export해 사용합니다.
const prismaClient = new PrismaClient({
  ...connectionOption,
  log: [
    { level: 'info', emit: 'event' },
    { level: 'warn', emit: 'event' },
    { level: 'error', emit: 'event' },
  ],
});

prismaClient.$on('info', e => {
  console.log(e);
});

prismaClient.$on('warn', e => {
  console.log(e);
});

prismaClient.$on('error', e => {
  console.log(e);
});

export default prismaClient;
