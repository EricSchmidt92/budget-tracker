import { Field, ID, ObjectType } from '@nestjs/graphql';
import { GraphQLUSCurrency } from 'graphql-scalars';

import { Category } from 'src/category/entities/category.model';

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

  @Field(() => GraphQLUSCurrency, {
    description: "The budget's max amount. This is the monetary amount to stay within for a budget",
  })
  maxAmount: string;

  @Field(() => GraphQLUSCurrency, {
    description: 'The sum of all the budget item amounts',
  })
  currentAmount: typeof GraphQLUSCurrency;

  @Field(() => [Category])
  categories: Category[];
}
