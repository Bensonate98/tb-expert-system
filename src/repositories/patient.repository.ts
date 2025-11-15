import { singleton } from 'tsyringe';
import Database from '../config/db';
import { Patient, Prisma } from '../../prisma/generated/prisma';

@singleton()
class PatientRepository {
  constructor(private readonly db: Database) {}

  async findById(id: string) {
    return await this.db.patient.findUnique({
      where: { id },
    });
  }

  async findByCode(patientCode: string) {
    return await this.db.patient.findUnique({
      where: { patientCode },
    });
  }

  async create(
    data: Prisma.PatientCreateInput,
    txn?: Prisma.TransactionClient
  ) {
    const dbClient = txn || this.db;
    return await dbClient.patient.create({
      data,
    });
  }

  async updateById(
    id: string,
    data: Partial<Patient>,
    txn?: Prisma.TransactionClient
  ) {
    const dbClient = txn || this.db;
    return await dbClient.patient.update({
      where: { id },
      data,
    });
  }

  async countPatientsThisYear(year: number) {
    return this.db.patient.count({
      where: {
        patientCode: {
          startsWith: `TB-${year}`,
        },
      },
    });
  }

  async findAllPatients() {
    return this.db.patient.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}

export default PatientRepository;
