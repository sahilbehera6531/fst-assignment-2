import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing existing data...');
  await prisma.auditLog.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.user.deleteMany();
  
  console.log('Seeding Database...');
  
  const roles = ['Admin', 'Member', 'Guest'];
  const statuses = ['PENDING', 'COMPLETED', 'FAILED'];
  
  // Seed Users
  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        name: faker.person.fullName(),
        role: faker.helpers.arrayElement(roles),
        image: faker.image.avatar(),
        emailVerified: true,
        
        // Associated Transactions
        transactions: {
          create: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).map(() => ({
            amount: faker.number.float({ min: 10, max: 500, fractionDigits: 2 }),
            description: faker.commerce.productDescription(),
            status: faker.helpers.arrayElement(statuses),
          })),
        },
      },
    });

    // Associated Audit Logs
    await prisma.auditLog.create({
      data: {
        action: 'USER_CREATED',
        details: `User ${user.email} created during automated seeding.`,
        userId: user.id,
      }
    });

    console.log(`Created user: ${user.email} with role: ${user.role}`);
  }

  console.log('Seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
