import { Field, InputType } from '@nestjs/graphql';
import { GraphQLUSCurrency } from 'graphql-scalars';

@InputType()
export class CreateBudgetItemInput {
  @Field()
  budgetId: string;

  @Field()
  name: string;

  @Field(() => GraphQLUSCurrency)
  amount: number;

  @Field({ nullable: true })
  dueDate?: Date;

  @Field({ nullable: true })
  paidDate?: Date;

  @Field()
  paid: boolean;

  @Field({ nullable: true })
  note?: string;

  @Field({ nullable: true })
  categoryId?: string;
}
