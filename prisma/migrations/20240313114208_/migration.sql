/*
  Warnings:

  - The `endMonth` column on the `Experience` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `startMonth` on the `Experience` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "MonthType" AS ENUM ('JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER', 'PRESENT');

-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "endMonth",
ADD COLUMN     "endMonth" "MonthType",
DROP COLUMN "startMonth",
ADD COLUMN     "startMonth" "MonthType" NOT NULL;
