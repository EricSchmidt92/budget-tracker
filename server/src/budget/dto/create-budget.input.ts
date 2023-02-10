import { Field, InputType } from '@nestjs/graphql';
import { GraphQLUSCurrency } from 'graphql-scalars';

@InputType()
export class CreateBudgetInput {
  @Field({ description: 'The budget name: e.g. "February Bills"' })
  name: string;

  @Field({
    nullable: true,
    description: 'An optional description for the budget',
  })
  description?: string;

  @Field(() => GraphQLUSCurrency, {
    description: 'The amount for the budget, so you know when you overspend',
  })
  amount: number;
}
