import { Module } from '@nestjs/common';

import { UsersService } from './users.service';

import { PrismaService } from 'src/prisma.service';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [],
  providers: [UsersService, UsersResolver, PrismaService],
  exports: [UsersService],
})
export class UsersModule {}
