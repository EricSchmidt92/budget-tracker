import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { BudgetItem } from 'src/budget-item/models/budget-item.model';

@ObjectType()
export class Budget {
  @Field(() => ID)
  id: string;

  @Field({ description: 'The name of the budget' })
  name: string;

  @Field({
    nullable: true,
    description: 'An optional description for the budget',
  })
  description?: string;

  @Field(() => Int, {
    description:
      'The budget amount. This is the monetary amount to stay within for a budget',
  })
  amount: number;

  @Field(() => [BudgetItem])
  budgetItems: BudgetItem[];
}
