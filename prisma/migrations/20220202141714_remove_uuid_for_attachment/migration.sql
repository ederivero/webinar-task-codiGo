/*
  Warnings:

  - You are about to drop the column `uuid` on the `attachments` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "attachments_uuid_key";

-- AlterTable
ALTER TABLE "attachments" DROP COLUMN "uuid";
