import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function main() {
  await prisma.budgetItem.deleteMany();
  await prisma.category.deleteMany();
  await prisma.budget.deleteMany();
  await prisma.user.deleteMany();

  console.log('Seeding...');

  const userId = randomUUID();

  const userBase = await prisma.user.create({
    data: {
      id: userId,
      email: 'b@b.comx',
      password: '$2b$10$hfNOkHYE3cyetoui0HXMN.ukzAUt4WfdA8lpq7WK1Yjze/adNVb2m', // b
    },
  });

  const monthlyBudget = await prisma.budget.create({
    data: {
      name: 'Monthly Budget',
      userId,
      description: 'This is the monthly budget we use it every month',
      currentAmount: 10000 + 5000,
      maxAmount: 30000,
    },
  });

  await prisma.budget.create({
    data: {
      name: 'Food Budget',
      userId,
      description: 'This is the monthly food budget',
    },
  });

  const electricCategory = await prisma.category.create({
    data: {
      budgetId: monthlyBudget.id,
      name: 'Electric bill',
      maxAmount: 10000,
      currentAmount: 9000,
      userId,
      budgetItems: {
        create: {
          name: 'Comed',
          amount: 9000,
          paid: true,
          dueDate: new Date(),
          paidDate: new Date(),
          note: 'Paid early',
          userId,
        },
      },
    },
    include: {
      budgetItems: true,
    },
  });

  const foodCategory = await prisma.category.create({
    data: {
      budgetId: monthlyBudget.id,
      name: 'Food',
      maxAmount: 10000,
      currentAmount: 2000 + 2490,
      userId,
      budgetItems: {
        createMany: {
          data: [
            {
              name: "Tony's run",
              amount: 2000,
              dueDate: new Date(),
              paidDate: new Date(),
              paid: true,
              note: 'For Chilaquiles',
              userId,
            },
            {
              name: 'Walmart run',
              amount: 2490,
              dueDate: new Date(),
              paidDate: new Date(),
              paid: true,
              note: 'For chips and pizza',
              userId,
            },
          ],
        },
      },
    },
    include: {
      budgetItems: true,
    },
  });

  console.log('seeded user1: ', userBase);
  console.log('seeded food category: ', foodCategory);
  console.log('seeded electric category: ', electricCategory);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
