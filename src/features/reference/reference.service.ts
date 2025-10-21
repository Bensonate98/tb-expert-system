import { injectable } from 'tsyringe';
import CourseRepository from '../../shared/repositories/course.repository';
import InstitutionRepository from '../../shared/repositories/institution.repository';

@injectable()
class ReferenceService {
  constructor(
    private readonly courseRepo: CourseRepository,
    private readonly institutionRepo: InstitutionRepository,
  ) {}

 async fetchCourses() {
  const courses = await this.courseRepo.findAll();
  const formattedCourses = courses.map((course) => course.name);
  return formattedCourses;
 }

 async fetchInstitutions() {
  const institutions = await this.institutionRepo.findAll();
  const formattedInstitutions = institutions.map((institution) => institution.name);
  return formattedInstitutions;
 }
}

export default ReferenceService;
