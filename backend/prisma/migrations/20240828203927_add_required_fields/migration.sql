/*
  Warnings:

  - You are about to drop the column `collaboratorId` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the `Collaborator` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `intention` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reason` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TicketIntention" AS ENUM ('OPERATIONAL', 'RELATIONSHIP', 'SUPPORT', 'SELLING');

-- CreateEnum
CREATE TYPE "TicketReason" AS ENUM ('REASON_1', 'REASON_2', 'REASON_3');

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_collaboratorId_fkey";

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "collaboratorId",
ADD COLUMN     "additionalInfo" TEXT,
ADD COLUMN     "contact" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "contactType" TEXT,
ADD COLUMN     "intention" "TicketIntention" NOT NULL,
ADD COLUMN     "reason" "TicketReason" NOT NULL,
ADD COLUMN     "vehicles" TEXT[];

-- DropTable
DROP TABLE "Collaborator";
