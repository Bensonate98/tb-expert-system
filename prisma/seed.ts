import { PrismaClient } from './generated/prisma';
import { seedCourses } from './seeds/courses';
import { seedInstitutions } from './seeds/institutions';
import logger from '../src/config/logger';

const prisma = new PrismaClient();

async function main() {
  logger.info('Starting database seeding...');

  await seedCourses(prisma);
  await seedInstitutions(prisma);

  logger.info('Database seeding completed!');
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    logger.error('❌ Seeding error:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
