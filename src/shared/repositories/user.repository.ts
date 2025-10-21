import { singleton } from 'tsyringe';
import Database from '../../config/db';
import { Prisma, User } from '../../../prisma/generated/prisma';

@singleton()
class UserRepository {
  constructor(private readonly db: Database) {}

  async findById(id: string) {
    return await this.db.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return await this.db.user.findUnique({
      where: { email },
    });
  }

  async findProfileById(userId: string) {
    return await this.db.userProfile.findUnique({
      where: { userId },
    });
  }

  async create(data: Prisma.UserCreateInput, txn?: Prisma.TransactionClient) {
    const dbClient = txn || this.db;
    return await dbClient.user.create({
      data,
    });
  }

  async updateById(
    id: string,
    data: Partial<User>,
    txn?: Prisma.TransactionClient
  ) {
    const dbClient = txn || this.db;
    return await dbClient.user.update({
      where: { id },
      data,
    });
  }
}

export default UserRepository;
