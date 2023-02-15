import { Field, ID, ObjectType } from '@nestjs/graphql';
import { GraphQLUSCurrency } from 'graphql-scalars';

@ObjectType()
export class BudgetItem {
  @Field(() => ID)
  id: string;

  @Field({ description: 'Name for the budget item (e.g. "Target run") ' })
  name: string;

  @Field((type) => GraphQLUSCurrency, {
    description: 'The amount of the budget item in pennies',
  })
  amount: number;

  @Field({
    nullable: true,
    description:
      'Optional due date for a budget item. Due date and paid date are useful for things such as a utility bill',
  })
  dueDate?: Date;

  @Field({
    nullable: true,
    description: 'Optional date for when a budget item is paid.',
  })
  paidDate?: Date;

  @Field({ description: 'If an item has been paid or not' })
  paid: boolean;

  @Field({
    nullable: true,
    description: 'Optional additional information for a budget item',
  })
  note?: string;
}
