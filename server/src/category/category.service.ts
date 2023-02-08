import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}
  create(userId: string, createCategoryInput: CreateCategoryInput) {
    return this.prismaService.category.create({
      data: {
        ...createCategoryInput,
        userId,
      },
    });
  }

  findAll(userId: string): Promise<Category[]> {
    return this.prismaService.category.findMany({
      where: {
        userId,
      },
      select: {
        name: true,
        id: true,
      },
    });
  }

  async findOne(userId: string, categoryId: string): Promise<Category> {
    return this.prismaService.category.findFirstOrThrow({
      where: { userId, id: categoryId },
    });
  }

  async update(
    userId: string,
    { id, ...data }: UpdateCategoryInput
  ): Promise<Category> {
    const { categories } = await this.prismaService.user.update({
      where: { id: userId },
      data: {
        categories: {
          update: {
            where: { id },
            data,
          },
        },
      },
      include: {
        categories: {
          where: { id },
        },
      },
    });

    if (categories.length < 1) {
      throw new NotFoundException();
    }

    const updatedCategory = categories[0];

    return { id: updatedCategory.id, name: updatedCategory.name };
  }

  async remove({ userId, categoryId }: { userId: string; categoryId: string }) {
    let categories: Category[];

    try {
      const updatedUser = await this.prismaService.user.update({
        where: { id: userId },
        data: {
          categories: {
            delete: {
              id: categoryId,
            },
          },
        },
        include: {
          categories: {
            where: { id: categoryId },
          },
        },
      });

      categories = updatedUser.categories;
    } catch (error) {
      console.error(error);
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2017'
      ) {
        console.error(error.message);
        throw new BadRequestException(
          'The categoryId does not seem to be valid'
        );
      }
      return false;
    }

    return categories.length === 0;
  }
}
