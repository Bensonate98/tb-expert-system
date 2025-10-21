import { singleton } from 'tsyringe';
import { PrismaClient } from '../../prisma/generated/prisma';
import logger from './logger';

@singleton()
class Database extends PrismaClient {
  constructor() {
    super({
      transactionOptions: {
        maxWait: 10000, // wait up to 10 seconds to start a transaction
        timeout: 30000, // allow transactions to run up to 30 seconds
      },
    });
  }

  async connect() {
    try {
      await this.$connect();
      logger.info('Database connection established');
    } catch (err) {
      logger.error('Failed to connect to database', err);
      process.exit(1);
    }
  }
}

export default Database;
