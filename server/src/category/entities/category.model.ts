import { Field, ID, ObjectType } from '@nestjs/graphql';
import { GraphQLUSCurrency } from 'graphql-scalars';
import { BudgetItem } from 'src/budget-item/models/budget-item.model';

@ObjectType()
export class Category {
  @Field(() => ID)
  id: string;

  @Field({ description: 'The name of the category' })
  name: string;

  @Field(() => GraphQLUSCurrency, {
    description: "The category's max amount. This is the monetary amount to stay within for a specific category",
  })
  maxAmount: number;

  @Field(() => GraphQLUSCurrency, {
    description: 'The sum of all budget item amounts for a specific category',
  })
  currentAmount: number;

  @Field(() => [BudgetItem])
  budgetItems: BudgetItem[];
}
