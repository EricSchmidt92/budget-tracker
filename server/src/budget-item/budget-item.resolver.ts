import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BudgetItemService } from './budget-item.service';
import { BudgetItem } from './models/budget-item.model';
import { CreateBudgetItemInput } from './dto/create-budget-item.input';
import { UpdateBudgetItemInput } from './dto/update-budget-item.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';

@UseGuards(GqlAuthGuard)
@Resolver(() => BudgetItem)
export class BudgetItemResolver {
  constructor(private readonly budgetItemService: BudgetItemService) {}

  @Mutation(() => BudgetItem)
  createBudgetItem(
    @Args('createBudgetItemInput') createBudgetItemInput: CreateBudgetItemInput
  ) {
    return this.budgetItemService.create(createBudgetItemInput);
  }

  @Query(() => [BudgetItem], { name: 'budgetItems' })
  findAll(@Args('budgetId') budgetId: string) {
    return this.budgetItemService.findAll(budgetId);
  }

  @Query(() => BudgetItem, { name: 'budgetItem' })
  findOne(@Args('id') id: string) {
    return this.budgetItemService.findOne(id);
  }

  @Mutation(() => BudgetItem)
  updateBudgetItem(
    @Args('updateBudgetItemInput') updateBudgetItemInput: UpdateBudgetItemInput
  ) {
    return this.budgetItemService.update(
      updateBudgetItemInput.id,
      updateBudgetItemInput
    );
  }

  @Mutation(() => BudgetItem)
  removeBudgetItem(@Args('id') id: string) {
    return this.budgetItemService.remove(id);
  }
}
