import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { User } from 'src/auth/users/models/user.model';
import { CategoryService } from './category.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';

@UseGuards(GqlAuthGuard)
@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => Category)
  createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
    @CurrentUser() { id: userId }
  ) {
    return this.categoryService.create(userId, createCategoryInput);
  }

  @Query(() => [Category], { name: 'categories' })
  findAll(@CurrentUser() { id: userId }: User) {
    return this.categoryService.findAll(userId);
  }

  @Query(() => Category, { name: 'category' })
  findOne(@CurrentUser() { id: userId }, @Args('id') categoryId: string) {
    return this.categoryService.findOne(userId, categoryId);
  }

  @Mutation(() => Category)
  updateCategory(
    @CurrentUser() { id: userId },
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput
  ) {
    return this.categoryService.update(userId, updateCategoryInput);
  }

  @Mutation(() => Boolean)
  removeCategory(
    @CurrentUser() { id: userId },
    @Args('id') categoryId: string
  ) {
    return this.categoryService.remove({ userId, categoryId });
  }
}
