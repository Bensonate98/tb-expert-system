import { singleton } from 'tsyringe';
import Database from '../config/db';
import { Diagnosis, Patient, Prisma, Report } from '../../prisma/generated/prisma';
import { CreateDiagnosisDto, CreateReportDto } from '../types/dto';

@singleton()
class ReportRepository {
  constructor(private readonly db: Database) {}

  async findById(id: string) {
    return await this.db.report.findUnique({
      where: { id },
    });
  }

  async findByPatientId(patientId: string) {
    return await this.db.report.findMany({
      where: { patientId },
    });
  }

   async create(data: CreateReportDto) {
    return this.db.report.create({
      data: {
        ...data,
      },
    });
  }

  async updateById(
    id: string,
    data: Partial<Report>,
    txn?: Prisma.TransactionClient
  ) {
    const dbClient = txn || this.db;
    return await dbClient.report.update({
      where: { id },
      data,
    });
  }

  async findAll() {
    return this.db.report.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}

export default ReportRepository;
