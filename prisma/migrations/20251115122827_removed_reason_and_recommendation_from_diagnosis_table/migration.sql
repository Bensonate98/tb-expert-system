/*
  Warnings:

  - You are about to drop the column `reason` on the `Diagnosis` table. All the data in the column will be lost.
  - You are about to drop the column `recommendation` on the `Diagnosis` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Diagnosis" DROP COLUMN "reason",
DROP COLUMN "recommendation";
