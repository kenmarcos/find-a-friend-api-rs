/*
  Warnings:

  - Added the required column `password` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whatsapp` to the `orgs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orgs" ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "whatsapp" TEXT NOT NULL;
