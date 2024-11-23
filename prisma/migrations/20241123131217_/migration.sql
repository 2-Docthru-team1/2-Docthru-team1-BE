/*
  Warnings:

  - The `benefits` column on the `Recipe` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `direction` column on the `Recipe` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "benefits",
ADD COLUMN     "benefits" TEXT[],
DROP COLUMN "direction",
ADD COLUMN     "direction" TEXT[];
