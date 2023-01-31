import { Injectable } from '@nestjs/common';
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
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: string, updateCategoryInput: UpdateCategoryInput) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
