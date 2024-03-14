/*
  Warnings:

  - You are about to drop the column `endDate` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Experience` table. All the data in the column will be lost.
  - Added the required column `startMonth` to the `Experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startYear` to the `Experience` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "endMonth" TEXT,
ADD COLUMN     "endYear" INTEGER,
ADD COLUMN     "startMonth" TEXT NOT NULL,
ADD COLUMN     "startYear" INTEGER NOT NULL;
