import { Module } from '@nestjs/common';
import { BudgetItemService } from './budget-item.service';
import { BudgetItemResolver } from './budget-item.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [BudgetItemResolver, BudgetItemService, PrismaService],
  exports: [BudgetItemResolver],
})
export class BudgetItemModule {}
