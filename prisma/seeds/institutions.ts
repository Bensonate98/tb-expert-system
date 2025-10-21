import { PrismaClient } from '../generated/prisma';
import logger from '../../src/config/logger';

export const seedInstitutions = async (prisma: PrismaClient) => {
  const institutions = ['Federal University Otuoke', 'Niger Delta University'];

  for (const institution of institutions) {
    await prisma.institution.upsert({
      where: { name: institution },
      update: {},
      create: { name: institution },
    });
  }

  logger.info('Institutions seeded >>>');
};
