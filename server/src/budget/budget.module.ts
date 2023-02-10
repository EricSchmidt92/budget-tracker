import { forwardRef, Module } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { BudgetResolver } from './budget.resolver';
import { BudgetItemModule } from 'src/budget-item/budget-item.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [forwardRef(() => BudgetItemModule)],
  providers: [BudgetResolver, BudgetService, PrismaService],
  exports: [BudgetService],
})
export class BudgetModule {}
