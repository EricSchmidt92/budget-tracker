import { forwardRef, Module } from '@nestjs/common';
import { CategoryModule } from 'src/category/category.module';
import { PrismaService } from 'src/prisma.service';
import { BudgetItemResolver } from './budget-item.resolver';
import { BudgetItemService } from './budget-item.service';

@Module({
  imports: [forwardRef(() => CategoryModule)],
  providers: [BudgetItemResolver, BudgetItemService, PrismaService],
  exports: [BudgetItemResolver],
})
export class BudgetItemModule {}
