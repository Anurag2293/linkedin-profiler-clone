/*
  Warnings:

  - You are about to drop the column `company` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `locationId` on the `Experience` table. All the data in the column will be lost.
  - Added the required column `companyName` to the `Experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employmentType` to the `Experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationType` to the `Experience` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Experience` required. This step will fail if there are existing NULL values in that column.
  - Made the column `endYear` on table `Experience` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "LocationType" AS ENUM ('Onsite', 'Hybrid', 'Remote');

-- DropForeignKey
ALTER TABLE "Experience" DROP CONSTRAINT "Experience_locationId_fkey";

-- DropForeignKey
ALTER TABLE "Experience" DROP CONSTRAINT "Experience_userId_fkey";

-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "company",
DROP COLUMN "locationId",
ADD COLUMN     "companyName" TEXT NOT NULL,
ADD COLUMN     "employmentType" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "locationType" "LocationType" NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "endYear" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
