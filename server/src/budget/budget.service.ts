import { Injectable } from '@nestjs/common';
import { Budget, Prisma } from '@prisma/client';
import BigNumber from 'bignumber.js';
import { PrismaService } from 'src/prisma.service';
import { CreateBudgetInput } from './dto/create-budget.input';
import { UpdateBudgetInput } from './dto/update-budget.input';

const budgetFullInclude = Prisma.validator<Prisma.BudgetInclude>()({
  categories: {
    include: {
      budgetItems: true,
    },
  },
});

@Injectable()
export class BudgetService {
  constructor(private readonly prismaService: PrismaService) {}

  create(userId: string, createBudgetInput: CreateBudgetInput): Promise<Budget> {
    return this.prismaService.budget.create({
      data: {
        ...createBudgetInput,
        userId,
      },
    });
  }

  findAll(userId: string) {
    return this.prismaService.budget.findMany({
      where: { userId },
      include: { ...budgetFullInclude },
    });
  }

  findOne(userId: string, budgetId: string) {
    return this.prismaService.budget.findFirstOrThrow({
      where: {
        id: budgetId,
        userId,
      },
      include: {
        ...budgetFullInclude,
      },
    });
  }

  update(budgetId: string, updateBudgetInput: UpdateBudgetInput) {
    return this.prismaService.budget.update({
      where: { id: budgetId },
      data: {
        ...updateBudgetInput,
      },
    });
  }

  remove(budgetId: string) {
    return this.prismaService.budget.delete({
      where: { id: budgetId },
    });
  }

  async updateCurrentTotal(budgetId: string) {
    const categories = await this.prismaService.category.findMany({
      where: { budgetId },
    });

    const categoriesTotal = categories.reduce(
      (accumulator, category) => new BigNumber(category.currentAmount).plus(accumulator),
      new BigNumber(0)
    );

    return this.prismaService.budget.update({
      where: { id: budgetId },
      data: {
        currentAmount: categoriesTotal.toNumber(),
      },
    });
  }
}
