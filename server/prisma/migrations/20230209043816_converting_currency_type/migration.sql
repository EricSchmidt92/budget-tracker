-- AlterTable
ALTER TABLE "Budget" ALTER COLUMN "amount" SET DEFAULT '0.00',
ALTER COLUMN "amount" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "BudgetItem" ALTER COLUMN "amount" SET DEFAULT '0.00',
ALTER COLUMN "amount" SET DATA TYPE TEXT;
