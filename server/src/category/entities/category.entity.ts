import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Category {
  @Field({ description: 'The name of the category' })
  name: string;

  @Field(() => ID)
  id: string;
}
