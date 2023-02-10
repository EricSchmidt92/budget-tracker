import { forwardRef, Module } from '@nestjs/common';
import { BudgetModule } from 'src/budget/budget.module';
import { PrismaService } from 'src/prisma.service';
import { BudgetItemResolver } from './budget-item.resolver';
import { BudgetItemService } from './budget-item.service';

@Module({
  imports: [forwardRef(() => BudgetModule)],
  providers: [BudgetItemResolver, BudgetItemService, PrismaService],
  exports: [BudgetItemResolver],
})
export class BudgetItemModule {}
