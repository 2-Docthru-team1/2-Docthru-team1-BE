/*
  Warnings:

  - You are about to drop the column `deleteAt` on the `AbortReason` table. All the data in the column will be lost.
  - You are about to drop the column `deleteAt` on the `Challenge` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Challenge` table. All the data in the column will be lost.
  - You are about to drop the column `deleteAt` on the `ChallengeWork` table. All the data in the column will be lost.
  - You are about to drop the column `deleteAt` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `deleteAt` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `deleteAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `deleteAt` on the `WorkImage` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Challenge" DROP CONSTRAINT "Challenge_userId_fkey";

-- AlterTable
ALTER TABLE "AbortReason" DROP COLUMN "deleteAt",
ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Challenge" DROP COLUMN "deleteAt",
DROP COLUMN "userId",
ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "ChallengeWork" DROP COLUMN "deleteAt",
ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "deleteAt",
ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "deleteAt",
ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" DROP COLUMN "deleteAt",
ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "WorkImage" DROP COLUMN "deleteAt",
ADD COLUMN     "deletedAt" TIMESTAMP(3);
