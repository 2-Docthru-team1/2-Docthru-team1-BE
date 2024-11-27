/*
  Warnings:

  - The `monthly` column on the `Challenge` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "MonthlyType" AS ENUM ('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');

-- AlterTable
ALTER TABLE "Challenge" DROP COLUMN "monthly",
ADD COLUMN     "monthly" "MonthlyType";
