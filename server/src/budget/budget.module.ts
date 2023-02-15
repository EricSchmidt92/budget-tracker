import { forwardRef, Module } from '@nestjs/common';
import { CategoryModule } from 'src/category/category.module';
import { PrismaService } from 'src/prisma.service';
import { BudgetResolver } from './budget.resolver';
import { BudgetService } from './budget.service';

@Module({
  imports: [forwardRef(() => CategoryModule)],
  providers: [BudgetResolver, BudgetService, PrismaService],
  exports: [BudgetService, BudgetResolver],
})
export class BudgetModule {}
