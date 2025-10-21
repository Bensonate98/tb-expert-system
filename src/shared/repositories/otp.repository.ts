import { singleton } from 'tsyringe';
import Database from '../../config/db';
import { Otp, Prisma } from '../../../prisma/generated/prisma';

@singleton()
class OtpRepository {
  constructor(private readonly db: Database) {}

  async findById(id: string) {
    return await this.db.otp.findUnique({
      where: { id },
    });
  }

  async findByCode(code: string) {
    return await this.db.otp.findFirst({
      where: { code },
    });
  }

  async create(
    userId: string,
    data: Omit<Prisma.OtpCreateInput, "user" | "userId">, 
    txn?: Prisma.TransactionClient
  ) {
    const dbClient = txn || this.db;
    return await dbClient.otp.create({
      data: {
        ...data,
        user: {
          connect: { id: userId}
        }
      }
    });
  }

  async findValidOtp(where: Prisma.OtpWhereInput) {
    return this.db.otp.findFirst({
      where: {
        ...where,
        used: false,
        expiresAt: { gt: new Date() }
      },
    });
  }

  async updateByUserId(
    userId: string,
    data: Partial<Otp>,
    txn?: Prisma.TransactionClient
  ) {
    const dbClient = txn || this.db;
    return await dbClient.otp.updateMany({
      where: { userId },
      data,
    });
  }

  async updateById(
    id: string,
    data: Partial<Otp>,
    txn?: Prisma.TransactionClient
  ) {
    const dbClient = txn || this.db;
    return await dbClient.otp.update({
      where: { id },
      data,
    });
  }
}

export default OtpRepository;
