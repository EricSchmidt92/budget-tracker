import { Module } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { BudgetResolver } from './budget.resolver';
import { BudgetItemModule } from 'src/budget-item/budget-item.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [BudgetItemModule],
  providers: [BudgetResolver, BudgetService, PrismaService],
})
export class BudgetModule {}
