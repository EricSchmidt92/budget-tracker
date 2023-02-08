import { Injectable } from '@nestjs/common';

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
  constructor(private readonly prismaService: PrismaService) {}

  create({
    budgetId,
    categoryId,
    ...budgetItemData
  }: CreateBudgetItemInput): Promise<BudgetItem> {
    return this.prismaService.budgetItem.create({
      data: {
        budget: connect(budgetId),

        category: connect(categoryId),
        ...budgetItemData,
      },
    });
  }

  findAll(budgetId: string) {
    return this.prismaService.budgetItem.findMany({
      where: {
        budgetId,
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
