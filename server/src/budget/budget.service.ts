import { Injectable } from '@nestjs/common';
import BigNumber from 'bignumber.js';
import { User } from 'src/auth/users/models/user.model';
import { PrismaService } from 'src/prisma.service';
import { CreateBudgetInput } from './dto/create-budget.input';
import { UpdateBudgetInput } from './dto/update-budget.input';
import { Budget } from './models/budget.model';

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
      include: { budgetItems: true },
    });
  }

  findOne(user: User, budgetId: string): Promise<Budget> {
    return this.prismaService.budget.findFirstOrThrow({
      where: {
        id: budgetId,
        user,
      },
      include: {
        budgetItems: true,
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
    const budgetItems = await this.prismaService.budgetItem.findMany({
      where: { budgetId },
    });

    const budgetItemsTotal = budgetItems.reduce(
      (accumulator, budgetItem) =>
        new BigNumber(budgetItem.amount).plus(accumulator),
      new BigNumber(0)
    );

    return this.prismaService.budget.update({
      where: { id: budgetId },
      data: {
        currentAmount: budgetItemsTotal.toNumber(),
      },
    });
  }
}
