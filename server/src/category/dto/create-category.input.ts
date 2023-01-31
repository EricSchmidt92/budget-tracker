import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
  @Field({ description: 'The name of the budget item category' })
  name: string;
}
