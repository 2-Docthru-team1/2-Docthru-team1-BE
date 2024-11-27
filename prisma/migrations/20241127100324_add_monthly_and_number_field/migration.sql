/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `Challenge` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Challenge" ADD COLUMN     "monthly" BOOLEAN,
ADD COLUMN     "number" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Challenge_number_key" ON "Challenge"("number");
