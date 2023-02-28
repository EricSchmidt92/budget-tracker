import { NotFoundException, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BudgetItem as PrismaBudgetItem, Prisma } from '@prisma/client';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { User } from 'src/auth/users/models/user.model';
import { CategoryService } from 'src/category/category.service';
import { AuthorizeProps } from 'types';
import { BudgetItemService } from './budget-item.service';
import { CreateBudgetItemInput } from './dto/create-budget-item.input';
import { UpdateBudgetItemInput } from './dto/update-budget-item.input';
import { BudgetItem } from './models/budget-item.model';

@UseGuards(GqlAuthGuard)
@Resolver(() => BudgetItem)
export class BudgetItemResolver {
  constructor(
    private readonly budgetItemService: BudgetItemService,
    private readonly categoryService: CategoryService
  ) {}

  @Mutation(() => BudgetItem)
  async createBudgetItem(
    @CurrentUser() { id: userId }: User,
    @Args('createBudgetItemInput') createBudgetItemInput: CreateBudgetItemInput
  ) {
    await this.authorizeCategory({ userId, categoryId: createBudgetItemInput.categoryId });

    return this.budgetItemService.create(userId, createBudgetItemInput);
  }

  @Query(() => [BudgetItem], { name: 'budgetItems' })
  async findAll(@CurrentUser() { id: userId }: User, @Args('categoryId') categoryId: string) {
    await this.authorizeCategory({ userId, categoryId });
    return this.budgetItemService.findAll(categoryId);
  }

  @Query(() => BudgetItem, { name: 'budgetItem' })
  findOne(@Args('id') id: string) {
    return this.budgetItemService.findOne(id);
  }

  @Mutation(() => BudgetItem)
  async updateBudgetItem(
    @CurrentUser() { id: userId },
    @Args('updateBudgetItemInput') updateBudgetItemInput: UpdateBudgetItemInput
  ) {
    await this.authorizeBudgetItem({ userId, budgetItemId: updateBudgetItemInput.id });
    return this.budgetItemService.update(updateBudgetItemInput);
  }

  @Mutation(() => Boolean)
  async removeBudgetItem(@CurrentUser() { id: userId }: User, @Args('id') budgetItemId: string) {
    await this.authorizeBudgetItem({ userId, budgetItemId });
    return this.budgetItemService.remove(budgetItemId);
  }

  private async authorizeCategory({ userId, categoryId }: AuthorizeProps<'category'>) {
    const { userId: categoryUserId } = await this.categoryService.findOne(categoryId);

    if (categoryUserId !== userId) {
      throw new UnauthorizedException('User does not own the category');
    }
  }

  private async authorizeBudgetItem({ userId, budgetItemId }: AuthorizeProps<'budgetItem'>) {
    let budgetItem: PrismaBudgetItem;
    try {
      budgetItem = await this.budgetItemService.findOne(budgetItemId);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new NotFoundException(`Budget Item not found with id of: ${budgetItemId}`);
      }
    }

    if (budgetItem.userId !== userId) {
      throw new UnauthorizedException('User does not own the budget Item');
    }
  }
}
