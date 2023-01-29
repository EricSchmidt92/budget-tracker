import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserInput } from './dto/create-user.input';

import { User } from './models/user.model';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(data: CreateUserInput) {
    await this.validateCreateUserData(data);
    const user = await this.prismaService.user.create({
      data: {
        ...data,
        password: await bcrypt.hash(data.password, 10),
      },
      select: {
        id: true,
        email: true,
      },
    });
    return user;
  }

  private async validateCreateUserData(data: CreateUserInput) {
    let userDocument: Prisma.UserWhereUniqueInput;
    try {
      userDocument = await this.prismaService.user.findUnique({
        where: { email: data.email },
      });
    } catch (err) {}

    if (userDocument) {
      throw new UnprocessableEntityException('Email already exists.');
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.prismaService.user.findUnique({ where: { email } });
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
    return user;
  }

  async getUser(args: Partial<User>) {
    const user = await this.prismaService.user.findUnique({
      where: { id: args.id, email: args.email },
      select: {
        id: true,
        email: true,
      },
    });
    return user;
  }
}
