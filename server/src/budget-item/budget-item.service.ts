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
    return `This action returns a #${id} budgetItem`;
  }

  update(id: string, updateBudgetItemInput: UpdateBudgetItemInput) {
    return `This action updates a #${id} budgetItem`;
  }

  remove(id: string) {
    return `This action removes a #${id} budgetItem`;
  }
}
