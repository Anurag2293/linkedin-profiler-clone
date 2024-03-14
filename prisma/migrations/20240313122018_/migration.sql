/*
  Warnings:

  - You are about to drop the `Endorsement` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Endorsement" DROP CONSTRAINT "Endorsement_skillId_fkey";

-- DropForeignKey
ALTER TABLE "Endorsement" DROP CONSTRAINT "Endorsement_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "aboutId" INTEGER;

-- DropTable
DROP TABLE "Endorsement";

-- CreateTable
CREATE TABLE "About" (
    "id" SERIAL NOT NULL,
    "about" TEXT NOT NULL,

    CONSTRAINT "About_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_aboutId_fkey" FOREIGN KEY ("aboutId") REFERENCES "About"("id") ON DELETE SET NULL ON UPDATE CASCADE;
