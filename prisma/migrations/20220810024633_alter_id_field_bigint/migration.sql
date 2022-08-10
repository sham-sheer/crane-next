/*
  Warnings:

  - You are about to alter the column `id` on the `Profile` table. The data in that column will be cast from `Int` to `BigInt`. This cast may fail. Please make sure the data in the column can be cast.
  - You are about to alter the column `userId` on the `Profile` table. The data in that column will be cast from `Int` to `BigInt`. This cast may fail. Please make sure the data in the column can be cast.
  - You are about to alter the column `id` on the `accounts` table. The data in that column will be cast from `Int` to `BigInt`. This cast may fail. Please make sure the data in the column can be cast.
  - You are about to alter the column `user_id` on the `accounts` table. The data in that column will be cast from `Int` to `BigInt`. This cast may fail. Please make sure the data in the column can be cast.
  - You are about to alter the column `id` on the `sessions` table. The data in that column will be cast from `Int` to `BigInt`. This cast may fail. Please make sure the data in the column can be cast.
  - You are about to alter the column `user_id` on the `sessions` table. The data in that column will be cast from `Int` to `BigInt`. This cast may fail. Please make sure the data in the column can be cast.
  - You are about to alter the column `id` on the `users` table. The data in that column will be cast from `Int` to `BigInt`. This cast may fail. Please make sure the data in the column can be cast.
  - Changed the type of `user_id` on the `Education` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `user_id` on the `JobRequest` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `user_id` on the `Work` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Education" DROP CONSTRAINT "Education_user_id_fkey";

-- DropForeignKey
ALTER TABLE "JobRequest" DROP CONSTRAINT "JobRequest_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Work" DROP CONSTRAINT "Work_user_id_fkey";

-- AlterTable
ALTER TABLE "Education" DROP COLUMN "user_id";
ALTER TABLE "Education" ADD COLUMN     "user_id" INT8 NOT NULL;

-- AlterTable
ALTER TABLE "JobRequest" DROP COLUMN "user_id";
ALTER TABLE "JobRequest" ADD COLUMN     "user_id" INT8 NOT NULL;

-- AlterTable
ALTER TABLE "Work" DROP COLUMN "user_id";
ALTER TABLE "Work" ADD COLUMN     "user_id" INT8 NOT NULL;

-- RedefineTables
CREATE TABLE "_prisma_new_Profile" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "bio" STRING,
    "userId" INT8 NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);
DROP INDEX "Profile_userId_key";
INSERT INTO "_prisma_new_Profile" ("bio","id","userId") SELECT "bio","id","userId" FROM "Profile";
DROP TABLE "Profile" CASCADE;
ALTER TABLE "_prisma_new_Profile" RENAME TO "Profile";
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
CREATE TABLE "_prisma_new_accounts" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "type" STRING NOT NULL,
    "provider" STRING NOT NULL,
    "provider_account_id" STRING NOT NULL,
    "refresh_token" STRING,
    "access_token" STRING,
    "expires_at" INT4,
    "token_type" STRING,
    "scope" STRING,
    "id_token" STRING,
    "session_state" STRING,
    "oauth_token_secret" STRING,
    "oauth_token" STRING,
    "user_id" INT8 NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);
DROP INDEX "accounts_provider_provider_account_id_key";
INSERT INTO "_prisma_new_accounts" ("access_token","expires_at","id","id_token","oauth_token","oauth_token_secret","provider","provider_account_id","refresh_token","scope","session_state","token_type","type","user_id") SELECT "access_token","expires_at","id","id_token","oauth_token","oauth_token_secret","provider","provider_account_id","refresh_token","scope","session_state","token_type","type","user_id" FROM "accounts";
DROP TABLE "accounts" CASCADE;
ALTER TABLE "_prisma_new_accounts" RENAME TO "accounts";
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
CREATE TABLE "_prisma_new_sessions" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "session_token" STRING NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "user_id" INT8 NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);
DROP INDEX "sessions_session_token_key";
INSERT INTO "_prisma_new_sessions" ("expires","id","session_token","user_id") SELECT "expires","id","session_token","user_id" FROM "sessions";
DROP TABLE "sessions" CASCADE;
ALTER TABLE "_prisma_new_sessions" RENAME TO "sessions";
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
CREATE TABLE "_prisma_new_users" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "name" STRING,
    "email" STRING,
    "email_verified" TIMESTAMP(3),
    "image" STRING,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
DROP INDEX "users_email_key";
INSERT INTO "_prisma_new_users" ("created_at","email","email_verified","id","image","name","updated_at") SELECT "created_at","email","email_verified","id","image","name","updated_at" FROM "users";
DROP TABLE "users" CASCADE;
ALTER TABLE "_prisma_new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "Work" ADD CONSTRAINT "Work_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobRequest" ADD CONSTRAINT "JobRequest_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
