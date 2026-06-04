-- DropForeignKey
ALTER TABLE "guests" DROP CONSTRAINT "guests_rsvpId_fkey";

-- AddForeignKey
ALTER TABLE "guests" ADD CONSTRAINT "guests_rsvpId_fkey" FOREIGN KEY ("rsvpId") REFERENCES "rsvps"("id") ON DELETE CASCADE ON UPDATE CASCADE;
