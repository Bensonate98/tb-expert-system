/*
  Warnings:

  - You are about to drop the column `departmentId` on the `UserProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "departmentId",
ALTER COLUMN "courseId" DROP NOT NULL,
ALTER COLUMN "institutionId" DROP NOT NULL,
ALTER COLUMN "avatarUrl" DROP NOT NULL,
ALTER COLUMN "level" DROP NOT NULL;
