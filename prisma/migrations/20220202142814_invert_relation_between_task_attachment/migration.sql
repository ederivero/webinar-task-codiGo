/*
  Warnings:

  - You are about to drop the column `attachmentId` on the `tasks` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[taskId]` on the table `attachments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `taskId` to the `attachments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_attachmentId_fkey";

-- DropIndex
DROP INDEX "tasks_attachmentId_key";

-- AlterTable
ALTER TABLE "attachments" ADD COLUMN     "taskId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "attachmentId";

-- CreateIndex
CREATE UNIQUE INDEX "attachments_taskId_key" ON "attachments"("taskId");

-- AddForeignKey
ALTER TABLE "attachments" ADD CONSTRAINT "attachments_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
