import { singleton } from 'tsyringe';
import Database from '../../config/db';
import { Prisma } from '../../../prisma/generated/prisma';
import { RefreshToken } from '@prisma/client';

@singleton()
class RefreshTokenRepository {
  constructor(private readonly db: Database) {}

  async create(
    userId: string,
    data: Omit<Prisma.RefreshTokenCreateInput, "user" | "userId">, 
    txn?: Prisma.TransactionClient
  ) {
    const dbClient = txn || this.db;
    return await dbClient.refreshToken.create({
      data: {
        ...data,
        user: {
          connect: { id: userId}
        }
      }
    });
  }

  async findByToken(token: string) {
    return await this.db.refreshToken.findFirst({
      where: { token }
    });
  }

  async updateById(
    id: string,
    data: Partial<RefreshToken>,
    txn?: Prisma.TransactionClient
  ) {
    const dbClient = txn || this.db;
    return await dbClient.refreshToken.update({
      where: { id },
      data,
    });
  }
}

export default RefreshTokenRepository;
