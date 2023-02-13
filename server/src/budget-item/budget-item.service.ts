import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { BudgetService } from 'src/budget/budget.service';

import { PrismaService } from 'src/prisma.service';
import { CreateBudgetItemInput } from './dto/create-budget-item.input';
import { UpdateBudgetItemInput } from './dto/update-budget-item.input';
import { BudgetItem } from './models/budget-item.model';

const connect = (id?: string): { connect: { id: string } } | undefined => {
  return id
    ? {
        connect: {
          id,
        },
      }
    : undefined;
};

@Injectable()
export class BudgetItemService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly budgetService: BudgetService
  ) {}

  async create({
    budgetId,
    categoryId,
    ...budgetItemData
  }: CreateBudgetItemInput): Promise<BudgetItem> {
    const budgetItem = await this.prismaService.budgetItem.create({
      data: {
        budget: connect(budgetId),

        category: connect(categoryId),
        ...budgetItemData,
      },
    });

    await this.budgetService.updateCurrentTotal(budgetId);

    return budgetItem;
  }

  async findAll(budgetId: string) {
    return this.prismaService.budgetItem.findMany({
      where: {
        budgetId,
      },
      include: {
        category: true,
      },
      orderBy: {
        category: {
          name: 'asc',
        },
      },
    });
  }

  findOne(id: string) {
    return `This action returns a #${id} budgetItem`;
  }

  update(id: string, updateBudgetItemInput: UpdateBudgetItemInput) {
    return `This action updates a #${id} budgetItem`;
  }

  remove(id: string) {
    return `This action removes a #${id} budgetItem`;
  }
}
