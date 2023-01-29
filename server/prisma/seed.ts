import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.budgetItem.deleteMany();
  await prisma.budget.deleteMany();
  await prisma.user.deleteMany();

  console.log('Seeding...');

  const user1 = await prisma.user.create({
    data: {
      email: 'b@b.comx',
      password: '$2b$10$hfNOkHYE3cyetoui0HXMN.ukzAUt4WfdA8lpq7WK1Yjze/adNVb2m', // b
      budgets: {
        create: {
          name: 'Food Expenses',
          description: 'Budget for food',
          amount: 100 * 100,

          budgetItems: {
            create: [
              {
                name: 'Veggies',
                amount: 300,
                dueDate: new Date(),
                paidDate: new Date(),
                paid: true,
                note: 'This is for our veggies',
              },
              {
                name: 'Meat',
                amount: 300,
                dueDate: new Date(),
                paidDate: new Date(),
                paid: true,
                note: 'This is for our meat spending',
              },
              {
                name: 'Makeup',
                amount: 300,
                dueDate: new Date(),
                paidDate: new Date(),
                paid: true,
              },
            ],
          },
        },
      },
    },
  });

  console.log('seeded user1: ', user1);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
