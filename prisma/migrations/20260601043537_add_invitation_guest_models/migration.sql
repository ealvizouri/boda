-- CreateTable
CREATE TABLE "invitations" (
    "id" TEXT NOT NULL,
    "family" TEXT NOT NULL,
    "maxGuests" INTEGER NOT NULL DEFAULT 2,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "invitations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rsvps" (
    "id" TEXT NOT NULL,
    "invitationId" TEXT,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "attending" BOOLEAN NOT NULL,
    "message" TEXT NOT NULL DEFAULT '',
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rsvps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guests" (
    "id" TEXT NOT NULL,
    "rsvpId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "meal" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "guests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "rsvps" ADD CONSTRAINT "rsvps_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "invitations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guests" ADD CONSTRAINT "guests_rsvpId_fkey" FOREIGN KEY ("rsvpId") REFERENCES "rsvps"("id") ON DELETE CASCADE ON UPDATE CASCADE;
