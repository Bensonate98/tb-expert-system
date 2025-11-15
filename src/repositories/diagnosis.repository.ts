import { singleton } from 'tsyringe';
import Database from '../config/db';
import { Diagnosis, Patient, Prisma } from '../../prisma/generated/prisma';
import { CreateDiagnosisDto } from '../types/dto';

@singleton()
class DiagnosisRepository {
  constructor(private readonly db: Database) {}

  async findById(id: string) {
    return await this.db.diagnosis.findUnique({
      where: { id },
    });
  }

  async findByPatientId(patientId: string) {
    return await this.db.diagnosis.findMany({
      where: { patientId },
    });
  }

  async create(data: CreateDiagnosisDto & { result: string }) {
    const { patientId, ...rest } = data;
    return this.db.diagnosis.create({
      data: {
        ...rest,
        patient: { connect: { id: patientId } },
      },
    });
  }


  async updateById(
    id: string,
    data: Partial<Diagnosis>,
    txn?: Prisma.TransactionClient
  ) {
    const dbClient = txn || this.db;
    return await dbClient.diagnosis.update({
      where: { id },
      data,
    });
  }
  async findAll() {
    return this.db.diagnosis.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}

export default DiagnosisRepository;
