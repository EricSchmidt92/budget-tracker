import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateBudgetInput {
  @Field({ description: 'The budget name: e.g. "February Bills"' })
  name: string;

  @Field({
    nullable: true,
    description: 'An optional description for the budget',
  })
  description?: string;

  @Field(() => Int, {
    description: 'The amount for the budget, so you know when you overspend',
    defaultValue: 0,
  })
  amount: number;
}
