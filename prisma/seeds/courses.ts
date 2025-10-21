import { PrismaClient } from '../generated/prisma';
import logger from '../../src/config/logger';

export const seedCourses = async (prisma: PrismaClient) => {
  const courses = [
    'Chemical Engineering',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Petroleum & Gas Engineering',
    'Computer Science & Informatics',
    'Biochemistry',
    'Microbiology',
  ];

  for (const course of courses) {
    await prisma.course.upsert({
      where: { name: course },
      update: {},
      create: { name: course },
    });
  }

  logger.info('Courses seeded >>>>>');
};
