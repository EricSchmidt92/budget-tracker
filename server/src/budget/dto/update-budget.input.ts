import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateBudgetInput } from './create-budget.input';

@InputType()
export class UpdateBudgetInput extends PartialType(CreateBudgetInput) {
  @Field(() => ID)
  id: string;
}
