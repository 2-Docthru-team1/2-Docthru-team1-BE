-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "workId" TEXT;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_workId_fkey" FOREIGN KEY ("workId") REFERENCES "ChallengeWork"("id") ON DELETE CASCADE ON UPDATE CASCADE;
