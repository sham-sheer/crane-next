/*
  Warnings:

  - You are about to drop the column `locationInterest` on the `JobRequest` table. All the data in the column will be lost.
  - You are about to drop the column `skill` on the `JobRequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "JobRequest" DROP COLUMN "locationInterest",
DROP COLUMN "skill",
ADD COLUMN     "locations" TEXT[],
ADD COLUMN     "skills" TEXT[];
