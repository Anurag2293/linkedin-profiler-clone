/*
  Warnings:

  - Added the required column `description` to the `Education` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Education" DROP CONSTRAINT "Education_userId_fkey";

-- AlterTable
ALTER TABLE "Education" ADD COLUMN     "description" TEXT NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
