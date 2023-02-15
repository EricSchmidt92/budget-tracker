import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import * as Joi from 'joi';
import { AuthModule } from 'src/auth/auth.module';
import { BudgetItemModule } from './budget-item/budget-item.module';
import { BudgetModule } from './budget/budget.module';
import { CategoryModule } from './category/category.module';
import { USCurrencyResolver, GraphQLUSCurrency } from 'graphql-scalars';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault],
      context: ({ req, res }: { req: Request; res: Response }) => ({
        req,
        res,
      }),
      cors: {
        credentials: true,
        origin: true,
      },
      resolvers: {
        USCurrency: USCurrencyResolver,
      },
    }),
    CategoryModule,
    BudgetModule,
    BudgetItemModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
