/*
  Warnings:

  - Added the required column `grade` to the `Education` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Education" ADD COLUMN     "grade" TEXT NOT NULL;
