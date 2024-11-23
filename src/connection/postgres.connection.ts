import { PrismaClient } from '@prisma/client';
import { postgresDatabaseUrl } from '../configs/postgres.config.js';

const connectionOption = { datasourceUrl: postgresDatabaseUrl };

// prismaClient를 선언해두고 export해 사용합니다.
const baseClient = new PrismaClient({
  ...connectionOption,
  log: [
    { level: 'info', emit: 'event' },
    { level: 'warn', emit: 'event' },
    { level: 'error', emit: 'event' },
  ],
});

baseClient.$on('info', e => {
  console.log(e);
});

baseClient.$on('warn', e => {
  console.log(e);
});

baseClient.$on('error', e => {
  console.log(e);
});

const prismaClient = baseClient.$extends({
  query: {
    $allOperations: async ({ model, operation, args, query }) => {
      if (operation !== 'create') {
        args.where = { deletedAt: null, ...args.where };
      }
      return query(args);
    },
  },
});

export default prismaClient;
