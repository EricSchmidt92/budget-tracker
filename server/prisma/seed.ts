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

  const foodCategory = await prisma.category.create({
    data: {
      name: 'food',
      userId: userId,
    },
  });

  const cosmeticsCategory = await prisma.category.create({
    data: {
      name: 'cosmetics',
      userId: userId,
    },
  });
  const updatedUser = await prisma.user.update({
    data: {
      budgets: {
        create: {
          name: 'Food Expenses',
          description: 'Budget for food',
          maxAmount: 100000,
          currentAmount: 300 + 3000 + 5000,
          budgetItems: {
            create: [
              {
                name: 'Veggies',
                amount: 300,
                dueDate: new Date(),
                paidDate: new Date(),
                paid: true,
                note: 'This is for our veggies',
                category: {
                  connect: {
                    id: foodCategory.id,
                  },
                },
              },
              {
                name: 'Meat',
                amount: 3000,
                dueDate: new Date(),
                paidDate: new Date(),
                paid: true,
                note: 'This is for our meat spending',
                category: {
                  connect: {
                    id: foodCategory.id,
                  },
                },
              },
              {
                name: 'Makeup',
                amount: 5000,
                dueDate: new Date(),
                paidDate: new Date(),
                paid: true,
                category: {
                  connect: {
                    id: cosmeticsCategory.id,
                  },
                },
              },
            ],
          },
        },
      },
    },
    where: {
      id: userId,
    },
  });

  console.log('seeded user1: ', updatedUser);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
