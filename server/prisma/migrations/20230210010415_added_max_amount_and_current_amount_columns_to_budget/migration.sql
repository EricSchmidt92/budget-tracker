/*
  Warnings:

  - You are about to drop the column `amount` on the `Budget` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Budget" DROP COLUMN "amount",
ADD COLUMN     "currentAmount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "maxAmount" INTEGER NOT NULL DEFAULT 0;
