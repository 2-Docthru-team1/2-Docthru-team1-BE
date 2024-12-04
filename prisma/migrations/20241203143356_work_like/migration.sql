/*
  Warnings:

  - You are about to drop the `workLike` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "workLike" DROP CONSTRAINT "workLike_challengeWorkId_fkey";

-- DropForeignKey
ALTER TABLE "workLike" DROP CONSTRAINT "workLike_userId_fkey";

-- DropTable
DROP TABLE "workLike";

-- CreateTable
CREATE TABLE "WorkLike" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,
    "challengeWorkId" TEXT NOT NULL,

    CONSTRAINT "WorkLike_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkLike" ADD CONSTRAINT "WorkLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkLike" ADD CONSTRAINT "WorkLike_challengeWorkId_fkey" FOREIGN KEY ("challengeWorkId") REFERENCES "ChallengeWork"("id") ON DELETE CASCADE ON UPDATE CASCADE;
