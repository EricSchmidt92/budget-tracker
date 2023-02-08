import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateBudgetItemInput {
  @Field()
  budgetId: string;

  @Field()
  name: string;

  @Field()
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
