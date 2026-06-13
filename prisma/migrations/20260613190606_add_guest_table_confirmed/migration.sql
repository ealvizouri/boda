-- AlterTable
ALTER TABLE "guests" ADD COLUMN     "confirmed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tableNumber" INTEGER;
