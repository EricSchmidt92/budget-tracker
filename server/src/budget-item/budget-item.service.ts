import { Injectable } from '@nestjs/common';
import { BudgetItem } from '@prisma/client';
import { CategoryService } from 'src/category/category.service';

import { PrismaService } from 'src/prisma.service';
import { CreateBudgetItemInput } from './dto/create-budget-item.input';
import { UpdateBudgetItemInput } from './dto/update-budget-item.input';

@Injectable()
export class BudgetItemService {
  constructor(private readonly prismaService: PrismaService, private readonly categoryService: CategoryService) {}

  async create(userId: string, createBudgetItemInput: CreateBudgetItemInput): Promise<BudgetItem> {
    const budgetItem = await this.prismaService.budgetItem.create({
      data: {
        ...createBudgetItemInput,
        userId,
      },
    });

    await this.categoryService.updateCurrentTotal(createBudgetItemInput.categoryId);

    return budgetItem;
  }

  async findAll(categoryId: string) {
    return this.prismaService.budgetItem.findMany({
      where: {
        categoryId,
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
    return this.prismaService.budgetItem.findFirstOrThrow({
      where: { id },
    });
  }

  async update({ id, ...data }: UpdateBudgetItemInput) {
    const updatedBudgetItem = await this.prismaService.budgetItem.update({
      where: { id },
      data: {
        ...data,
      },
    });

    await this.categoryService.updateCurrentTotal(updatedBudgetItem.categoryId);

    return updatedBudgetItem;
  }

  async remove(id: string) {
    const deletedBudgetItem = await this.prismaService.budgetItem.delete({
      where: { id },
    });

    if (deletedBudgetItem === undefined) {
      return false;
    }

    await this.categoryService.updateCurrentTotal(deletedBudgetItem.categoryId);

    return true;
  }
}
