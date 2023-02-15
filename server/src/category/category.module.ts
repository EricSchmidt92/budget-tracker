import { forwardRef, Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { PrismaService } from 'src/prisma.service';
import { BudgetModule } from 'src/budget/budget.module';
import { BudgetItemModule } from 'src/budget-item/budget-item.module';

@Module({
  imports: [forwardRef(() => BudgetModule), forwardRef(() => BudgetItemModule)],
  providers: [CategoryResolver, CategoryService, PrismaService],
  exports: [CategoryResolver, CategoryService],
})
export class CategoryModule {}
