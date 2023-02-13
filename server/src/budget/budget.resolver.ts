import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { User } from 'src/auth/users/models/user.model';
import { BudgetItemResolver } from 'src/budget-item/budget-item.resolver';
import { BudgetItem } from 'src/budget-item/models/budget-item.model';
import { BudgetService } from './budget.service';
import { CreateBudgetInput } from './dto/create-budget.input';
import { UpdateBudgetInput } from './dto/update-budget.input';
import { Budget } from './models/budget.model';

@UseGuards(GqlAuthGuard)
@Resolver(() => Budget)
export class BudgetResolver {
  constructor(
    private readonly budgetService: BudgetService,
    private readonly budgetItemResolver: BudgetItemResolver
  ) {}

  @Mutation(() => Budget)
  createBudget(
    @CurrentUser() { id: userId },
    @Args('createBudgetInput') createBudgetInput: CreateBudgetInput
  ) {
    return this.budgetService.create(userId, createBudgetInput);
  }

  @Query(() => [Budget], { name: 'budgets' })
  findAll(@CurrentUser() { id: userId }) {
    return this.budgetService.findAll(userId);
  }

  @Query(() => Budget, { name: 'budget' })
  findOne(@CurrentUser() user: User, @Args('id') id: string) {
    return this.budgetService.findOne(user, id);
  }

  @Mutation(() => Budget)
  updateBudget(
    @Args('updateBudgetInput') updateBudgetInput: UpdateBudgetInput
  ) {
    return this.budgetService.update(updateBudgetInput.id, updateBudgetInput);
  }

  @Mutation(() => Budget)
  removeBudget(@Args('id') id: string) {
    return this.budgetService.remove(id);
  }

  @ResolveField('budgetItems', () => [BudgetItem])
  async budgetItems(@Parent() { id }: Budget) {
    return this.budgetItemResolver.findAll(id);
  }
}
