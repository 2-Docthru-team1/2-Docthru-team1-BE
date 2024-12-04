/*
  Warnings:

  - You are about to drop the column `isRead` on the `Notification` table. All the data in the column will be lost.
  - Made the column `deletedAt` on table `Notification` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "isRead",
ALTER COLUMN "deletedAt" SET NOT NULL;
