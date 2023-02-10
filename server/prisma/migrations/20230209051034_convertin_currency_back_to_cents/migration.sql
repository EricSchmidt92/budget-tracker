/*
  Warnings:

  - The `amount` column on the `Budget` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `amount` on the `BudgetItem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Budget" DROP COLUMN "amount",
ADD COLUMN     "amount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "BudgetItem" DROP COLUMN "amount",
ADD COLUMN     "amount" INTEGER NOT NULL;
