import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BudgetItemService } from './budget-item.service';
import { BudgetItem } from './models/budget-item.model';
import { CreateBudgetItemInput } from './dto/create-budget-item.input';
import { UpdateBudgetItemInput } from './dto/update-budget-item.input';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CategoryService } from 'src/category/category.service';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/auth/users/models/user.model';
import { AuthorizeProps } from 'types';

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
  findAll(@Args('categoryId') categoryId: string) {
    return this.budgetItemService.findAll(categoryId);
  }

  //TODO: finish implementing
  // @Query(() => BudgetItem, { name: 'budgetItem' })
  // findOne(@Args('id') id: string) {
  //   return this.budgetItemService.findOne(id);
  // }

  // @Mutation(() => BudgetItem)
  // updateBudgetItem(@Args('updateBudgetItemInput') updateBudgetItemInput: UpdateBudgetItemInput) {
  //   return this.budgetItemService.update(updateBudgetItemInput.id, updateBudgetItemInput);
  // }

  // @Mutation(() => BudgetItem)
  // removeBudgetItem(@Args('id') id: string) {
  //   return this.budgetItemService.remove(id);
  // }

  private async authorizeCategory({ userId, categoryId }: AuthorizeProps<'category'>) {
    const { userId: categoryUserId } = await this.categoryService.findOne(categoryId);

    if (categoryUserId !== userId) {
      throw new UnauthorizedException('User does not own the category');
    }
  }
}
