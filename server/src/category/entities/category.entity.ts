import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Category {
  @Field({ description: 'Example field (placeholder)' })
  name: string;
}
