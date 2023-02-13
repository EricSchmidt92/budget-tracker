import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import BigNumber from 'bignumber.js';
import { User } from 'src/auth/users/models/user.model';
import { PrismaService } from 'src/prisma.service';
import { CreateBudgetInput } from './dto/create-budget.input';
import { UpdateBudgetInput } from './dto/update-budget.input';
import { Budget } from './models/budget.model';

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

  create(userId: string, createBudgetInput: CreateBudgetInput) {
    return this.prismaService.budget.create({
      data: {
        ...createBudgetInput,
        userId,
      },
    });
  }

  findAll(userId: string): Promise<Budget[]> {
    return this.prismaService.budget.findMany({
      where: { userId },
      include: { ...budgetFullInclude },
    });
  }

  findOne(user: User, budgetId: string): Promise<Budget> {
    return this.prismaService.budget.findFirstOrThrow({
      where: {
        id: budgetId,
        user,
      },
      include: {
        ...budgetFullInclude,
      },
    });
  }

  update(id: string, updateBudgetInput: UpdateBudgetInput) {
    return `This action updates a #${id} budget`;
  }

  remove(id: string) {
    return `This action removes a #${id} budget`;
  }

  async updateCurrentTotal(budgetId: string) {
    const categories = await this.prismaService.category.findMany({
      where: { budgetId },
    });

    const categoriesTotal = categories.reduce(
      (accumulator, category) =>
        new BigNumber(category.currentAmount).plus(accumulator),
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
