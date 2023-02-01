import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Category {
  @Field({ description: 'Example field (placeholder)' })
  name: string;

  @Field(() => ID)
  id: string;
}
