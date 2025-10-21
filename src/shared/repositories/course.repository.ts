import { singleton } from 'tsyringe';
import Database from '../../config/db';

@singleton()
class CourseRepository {
  constructor(private readonly db: Database) {}

  async findAll() {
    return await this.db.course.findMany();
  }
}

 

export default CourseRepository;
