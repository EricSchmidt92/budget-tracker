import { NotFoundException, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

import { CurrentUser } from 'src/auth/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { User } from 'src/auth/users/models/user.model';
import { BudgetItemResolver } from 'src/budget-item/budget-item.resolver';
import { BudgetItem } from 'src/budget-item/models/budget-item.model';
import { BudgetService } from 'src/budget/budget.service';
import { AuthorizeProps } from 'types';
import { CategoryService } from './category.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.model';

@UseGuards(GqlAuthGuard)
@Resolver(() => Category)
export class CategoryResolver {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly budgetService: BudgetService,
    private readonly budgetItemResolver: BudgetItemResolver
  ) {}

  @Mutation(() => Category)
  async createCategory(
    @CurrentUser() { id: userId }: User,
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput
  ) {
    await this.authorizeBudget({ userId, budgetId: createCategoryInput.budgetId });

    return this.categoryService.create(userId, createCategoryInput);
  }

  @Query(() => [Category], { name: 'categories' })
  async findAll(@CurrentUser() { id: userId }: User, @Args('budgetId') budgetId: string) {
    await this.authorizeBudget({ userId, budgetId });

    return this.categoryService.findAll(budgetId);
  }

  @Query(() => Category, { name: 'category' })
  async findOne(@CurrentUser() { id: userId }: User, @Args('id') categoryId: string) {
    await this.authorizeCategory({ userId, categoryId });

    return this.categoryService.findOne(categoryId);
  }

  @Mutation(() => Category)
  async updateCategory(
    @CurrentUser() { id: userId },
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput
  ) {
    await this.authorizeCategory({ userId, categoryId: updateCategoryInput.id });

    return this.categoryService.update(updateCategoryInput);
  }

  @Mutation(() => Boolean)
  async removeCategory(@CurrentUser() { id: userId }, @Args('id') categoryId: string) {
    await this.authorizeCategory({ userId, categoryId });

    return this.categoryService.remove(categoryId);
  }

  @ResolveField('budgetItems', () => [BudgetItem])
  async budgetItems(@CurrentUser() user: User, @Parent() { id: categoryId }: Category) {
    return this.budgetItemResolver.findAll(user, categoryId);
  }

  private async authorizeBudget({ userId, budgetId }: AuthorizeProps<'budget'>) {
    const { userId: budgetUserId } = await this.budgetService.findOne(userId, budgetId);

    if (budgetUserId !== userId) {
      throw new UnauthorizedException('User does not own this budget');
    }
  }

  private async authorizeCategory({ userId, categoryId }: AuthorizeProps<'category'>) {
    let categoryUserId: string;

    try {
      ({ userId: categoryUserId } = await this.categoryService.findOne(categoryId));
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new NotFoundException(`Category with id of ${categoryId} not found`);
      }
    }

    if (categoryUserId !== userId) {
      throw new UnauthorizedException('User does not own the Category');
    }
  }
}
