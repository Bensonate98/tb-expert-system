import { injectable } from 'tsyringe';
import PatientRepository from '../repositories/patient.repository';
import DiagnosisRepository from '../repositories/diagnosis.repository';
import { CreateDiagnosisDto } from '../types/dto';
import AppError from '../utils/appError';
import ErrorTypes from '../constants/errorTypes';

@injectable()
class DiagnosisService {
  constructor(
    private readonly patientRepo: PatientRepository,
    private readonly repo: DiagnosisRepository,
) {}

  async createDiagnosis(data: CreateDiagnosisDto) {
    // 1. Validate patient exists
    const patient = await this.patientRepo.findById(data.patientId);
    if (!patient) throw new Error("Patient not found");

    // 2. Scoring
    let score = 0;
    if (data.cough2Weeks) score += 2;
    if (data.nightSweat) score += 1;
    if (data.weightLoss) score += 1;
    if (data.fever) score += 1;
    if (data.chestPain) score += 1;
    if (data.bloodInSputum) score += 2;
    if (data.fatigue) score += 1;
    if (data.contactWithTb) score += 2;

    // 3. Result interpretation
    let result = "Unlikely TB";
    if (score >= 7) result = "Likely TB";
    else if (score >= 4) result = "Possible TB";

    // 4. Save to DB
    return this.repo.create({ ...data, result });
  }

  async getDiagnosesByPatient(patientId: string) {
    const patient = await this.patientRepo.findById(patientId);
    if (!patient) throw new AppError("Patient not found", 404, ErrorTypes.NOT_FOUND);
    const diagnosis = this.repo.findByPatientId(patientId);
    return diagnosis;
  }
}

export default DiagnosisService;
