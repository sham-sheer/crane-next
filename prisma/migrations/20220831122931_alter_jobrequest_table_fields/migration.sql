/*
  Warnings:

  - You are about to drop the column `degree` on the `JobRequest` table. All the data in the column will be lost.
  - You are about to drop the column `dob` on the `JobRequest` table. All the data in the column will be lost.
  - You are about to drop the column `locations` on the `JobRequest` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `JobRequest` table. All the data in the column will be lost.
  - You are about to drop the `JobApplication` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `phone` to the `JobRequest` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "JobApplication" DROP CONSTRAINT "JobApplication_job_id_fkey";

-- DropForeignKey
ALTER TABLE "JobApplication" DROP CONSTRAINT "JobApplication_user_id_fkey";

-- DropForeignKey
ALTER TABLE "JobRequest" DROP CONSTRAINT "JobRequest_user_id_fkey";

-- AlterTable
ALTER TABLE "JobRequest" DROP COLUMN "degree";
ALTER TABLE "JobRequest" DROP COLUMN "dob";
ALTER TABLE "JobRequest" DROP COLUMN "locations";
ALTER TABLE "JobRequest" DROP COLUMN "user_id";
ALTER TABLE "JobRequest" ADD COLUMN     "countries" STRING[];
ALTER TABLE "JobRequest" ADD COLUMN     "phone" STRING NOT NULL;

-- DropTable
DROP TABLE "JobApplication";
