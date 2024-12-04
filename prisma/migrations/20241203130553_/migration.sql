/*
  Warnings:

  - You are about to drop the `_likeRelation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_likeRelation" DROP CONSTRAINT "_likeRelation_A_fkey";

-- DropForeignKey
ALTER TABLE "_likeRelation" DROP CONSTRAINT "_likeRelation_B_fkey";

-- DropTable
DROP TABLE "_likeRelation";

-- CreateTable
CREATE TABLE "workLike" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,
    "challengeWorkId" TEXT NOT NULL,

    CONSTRAINT "workLike_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "workLike" ADD CONSTRAINT "workLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workLike" ADD CONSTRAINT "workLike_challengeWorkId_fkey" FOREIGN KEY ("challengeWorkId") REFERENCES "ChallengeWork"("id") ON DELETE CASCADE ON UPDATE CASCADE;
