import { injectable } from 'tsyringe';
import PatientRepository from '../repositories/patient.repository';
import { CreatePatientDto } from '../types/dto';
import AppError from '../utils/appError';
import ErrorTypes from '../constants/errorTypes';

@injectable()
class PatientService {
  constructor(private readonly patientRepo: PatientRepository) {}

  async register(data: CreatePatientDto) {
    const currentYear = new Date().getFullYear();
    const patientCount = await this.patientRepo.countPatientsThisYear(currentYear);
    const patientCode = `TB-${currentYear}-${(patientCount + 1)
      .toString()
      .padStart(4, '0')}`;

    const newPatient = await this.patientRepo.create({
      ...data,
      patientCode,
    });

    return newPatient;
  }

  async fetcAllPatients() {
    return this.patientRepo.findAllPatients();
  }

  async fetchPatient(patientId: string) {
    const patient = await this.patientRepo.findById(patientId);
    if(!patient) {
      throw new AppError("Patient not found", 404, ErrorTypes.NOT_FOUND);
    }
    return patient;
  }

  async fetchPatientByCode(patientCode: string) {
    const patient = await this.patientRepo.findByCode(patientCode);
    if(!patient) {
      throw new AppError("Patient not found", 404, ErrorTypes.NOT_FOUND);
    }
    return patient;
  }
}

export default PatientService;
