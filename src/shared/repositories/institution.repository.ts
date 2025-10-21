import { singleton } from 'tsyringe';
import Database from '../../config/db';

@singleton()
class InstitutionRepository {
  constructor(private readonly db: Database) {}

  async findAll() {
    return await this.db.institution.findMany();
  }
}

export default InstitutionRepository;
