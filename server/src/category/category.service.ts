import { BadRequestException, Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import BigNumber from 'bignumber.js';
import { BudgetService } from 'src/budget/budget.service';
import { PrismaService } from 'src/prisma.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService, private readonly budgetService: BudgetService) {}

  async create(userId: string, createCategoryInput: CreateCategoryInput): Promise<Category> {
    const category = await this.prismaService.category.create({
      data: {
        ...createCategoryInput,
        userId,
      },
    });

    // await this.budgetService.updateCurrentTotal(createCategoryInput.budgetId);

    return category;
  }

  findAll(budgetId: string): Promise<Category[]> {
    return this.prismaService.category.findMany({
      where: {
        budgetId,
      },
      include: {
        budgetItems: true,
      },
    });
  }

  async findOne(categoryId: string): Promise<Category> {
    return this.prismaService.category.findFirstOrThrow({
      where: { id: categoryId },
      include: {
        budgetItems: true,
      },
    });
  }

  async update({ id, ...data }: UpdateCategoryInput) {
    return this.prismaService.category.update({
      where: { id },
      data: {
        ...data,
      },
    });
  }

  async remove(categoryId: string) {
    let category: Category;

    try {
      category = await this.prismaService.category.delete({
        where: { id: categoryId },
      });

      await this.budgetService.updateCurrentTotal(category.budgetId);
    } catch (error) {
      console.error(error);
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2017') {
        console.error(error.message);
        throw new BadRequestException('The categoryId does not seem to be valid');
      }
      return false;
    }

    return category !== undefined;
  }

  async updateCurrentTotal(categoryId: string) {
    const budgetItems = await this.prismaService.budgetItem.findMany({
      where: { categoryId: categoryId },
    });

    const budgetItemsTotal = budgetItems.reduce(
      (accumulater, { amount }) => new BigNumber(amount).plus(accumulater),
      new BigNumber(0)
    );

    const updatedCategory = await this.prismaService.category.update({
      where: { id: categoryId },
      data: {
        currentAmount: budgetItemsTotal.toNumber(),
      },
    });

    await this.budgetService.updateCurrentTotal(updatedCategory.budgetId);

    return updatedCategory;
  }
}
