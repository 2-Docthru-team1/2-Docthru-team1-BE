-- AlterTable
ALTER TABLE "User" ALTER COLUMN "refreshToken" DROP NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'normal';
