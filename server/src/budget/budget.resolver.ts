import { NotFoundException, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { User } from 'src/auth/users/models/user.model';
import { CategoryResolver } from 'src/category/category.resolver';
import { Category } from 'src/category/entities/category.model';
import { AuthorizeProps } from 'types';
import { BudgetService } from './budget.service';
import { CreateBudgetInput } from './dto/create-budget.input';
import { UpdateBudgetInput } from './dto/update-budget.input';
import { Budget } from './models/budget.model';

@UseGuards(GqlAuthGuard)
@Resolver(() => Budget)
export class BudgetResolver {
  constructor(private readonly budgetService: BudgetService, private readonly categoryResolver: CategoryResolver) {}

  @Mutation(() => Budget)
  createBudget(@CurrentUser() { id: userId }, @Args('createBudgetInput') createBudgetInput: CreateBudgetInput) {
    return this.budgetService.create(userId, createBudgetInput);
  }

  @Query(() => [Budget], { name: 'budgets' })
  findAll(@CurrentUser() { id: userId }) {
    return this.budgetService.findAll(userId);
  }

  @Query(() => Budget, { name: 'budget' })
  findOne(@CurrentUser() { id: userId }: User, @Args('id') id: string) {
    return this.budgetService.findOne(userId, id);
  }

  @Mutation(() => Budget)
  async updateBudget(
    @CurrentUser() { id: userId }: User,
    @Args('updateBudgetInput') updateBudgetInput: UpdateBudgetInput
  ) {
    await this.authorizeBudget({ userId, budgetId: updateBudgetInput.id });
    return this.budgetService.update(updateBudgetInput.id, updateBudgetInput);
  }

  @Mutation(() => Budget)
  async removeBudget(@CurrentUser() { id: userId }, @Args('id') budgetId: string) {
    await this.authorizeBudget({ userId, budgetId });
    return this.budgetService.remove(budgetId);
  }

  @ResolveField('categories', () => [Category])
  async categories(@CurrentUser() user: User, @Parent() { id: budgetId }: Budget) {
    return this.categoryResolver.findAll(user, budgetId);
  }

  private async authorizeBudget({ userId, budgetId }: AuthorizeProps<'budget'>) {
    let foundUserId: string;
    try {
      ({ userId: foundUserId } = await this.budgetService.findOne(userId, budgetId));
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new NotFoundException(`Budget with id of ${budgetId} not found`);
      }
    }

    if (foundUserId !== userId) {
      throw new UnauthorizedException('User does not own the Budget');
    }
  }
}
