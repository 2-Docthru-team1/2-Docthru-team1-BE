/*
  Warnings:

  - The values [Youtube,Blog,RecipeWeb,SocialMedia] on the enum `MediaType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MediaType_new" AS ENUM ('youtube', 'blog', 'recipeWeb', 'socialMedia');
ALTER TABLE "Challenge" ALTER COLUMN "mediaType" TYPE "MediaType_new" USING ("mediaType"::text::"MediaType_new");
ALTER TYPE "MediaType" RENAME TO "MediaType_old";
ALTER TYPE "MediaType_new" RENAME TO "MediaType";
DROP TYPE "MediaType_old";
COMMIT;
