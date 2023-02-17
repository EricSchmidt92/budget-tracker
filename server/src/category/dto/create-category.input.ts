import { Field, InputType } from '@nestjs/graphql';
import { GraphQLUSCurrency } from 'graphql-scalars';

@InputType()
export class CreateCategoryInput {
  @Field({ description: 'The name of the budget category' })
  name: string;

  @Field()
  budgetId: string;

  @Field(() => GraphQLUSCurrency)
  maxAmount: number;
}
