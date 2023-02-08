import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateBudgetItemInput } from './create-budget-item.input';

@InputType()
export class UpdateBudgetItemInput extends PartialType(CreateBudgetItemInput) {
  @Field(() => ID)
  id: string;
}
