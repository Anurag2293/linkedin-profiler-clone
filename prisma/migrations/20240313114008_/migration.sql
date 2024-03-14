/*
  Warnings:

  - The values [Onsite,Hybrid,Remote] on the enum `LocationType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LocationType_new" AS ENUM ('ONSITE', 'HYBRID', 'REMOTE');
ALTER TABLE "Experience" ALTER COLUMN "locationType" TYPE "LocationType_new" USING ("locationType"::text::"LocationType_new");
ALTER TYPE "LocationType" RENAME TO "LocationType_old";
ALTER TYPE "LocationType_new" RENAME TO "LocationType";
DROP TYPE "LocationType_old";
COMMIT;
