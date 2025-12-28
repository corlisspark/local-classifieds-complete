/*
  Warnings:

  - You are about to drop the column `favorites` on the `clients` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "clients" DROP COLUMN "favorites",
ALTER COLUMN "phone" SET DATA TYPE VARCHAR(30);

-- AlterTable
ALTER TABLE "providers" ALTER COLUMN "phone" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "whatsapp" SET DATA TYPE VARCHAR(30);

-- CreateTable
CREATE TABLE "client_favorites" (
    "clientId" UUID NOT NULL,
    "providerId" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "client_favorites_pkey" PRIMARY KEY ("clientId","providerId")
);

-- AddForeignKey
ALTER TABLE "client_favorites" ADD CONSTRAINT "client_favorites_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_favorites" ADD CONSTRAINT "client_favorites_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "providers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
