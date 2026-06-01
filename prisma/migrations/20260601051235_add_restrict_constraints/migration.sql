/*
  Warnings:

  - You are about to drop the column `meal` on the `guests` table. All the data in the column will be lost.
  - You are about to drop the column `family` on the `invitations` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `invitations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `invitations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipient` to the `invitations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "guests" DROP CONSTRAINT "guests_rsvpId_fkey";

-- DropForeignKey
ALTER TABLE "rsvps" DROP CONSTRAINT "rsvps_invitationId_fkey";

-- AlterTable
ALTER TABLE "guests" DROP COLUMN "meal";

-- AlterTable
ALTER TABLE "invitations" DROP COLUMN "family",
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "recipient" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "invitations_code_key" ON "invitations"("code");

-- AddForeignKey
ALTER TABLE "rsvps" ADD CONSTRAINT "rsvps_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "invitations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guests" ADD CONSTRAINT "guests_rsvpId_fkey" FOREIGN KEY ("rsvpId") REFERENCES "rsvps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
