/*
  Warnings:

  - Changed the type of `employmentType` on the `Experience` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ExperienceType" AS ENUM ('FULL_TIME', 'PART_TIME', 'SELF_EMPLOYED', 'FREELANCE', 'INTERNSHIP', 'TRAINEE');

-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "employmentType",
ADD COLUMN     "employmentType" "ExperienceType" NOT NULL;
