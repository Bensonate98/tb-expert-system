import { injectable } from 'tsyringe';
import PatientRepository from '../repositories/patient.repository';
import DiagnosisRepository from '../repositories/diagnosis.repository';
import ErrorTypes from '../constants/errorTypes';
import ReportRepository from '../repositories/report.repository';
import AppError from '../utils/appError';

@injectable()
class ReportService {
  constructor(
    private readonly patientRepo: PatientRepository,
    private readonly diagnosisRepo: DiagnosisRepository,
    private readonly repo: ReportRepository,
) {}

   async generateReport(diagnosisId: string) {
    // 1. Get the diagnosis
    const diagnosis = await this.diagnosisRepo.findById(diagnosisId);
    if (!diagnosis) throw new Error("Diagnosis not found");

    // 2. Prepare symptoms as bullet points
    const symptoms: string[] = [];
    if (diagnosis.cough2Weeks) symptoms.push("• Cough > 2 weeks");
    if (diagnosis.nightSweat) symptoms.push("• Night sweats");
    if (diagnosis.weightLoss) symptoms.push("• Weight loss");
    if (diagnosis.fever) symptoms.push("• Fever");
    if (diagnosis.chestPain) symptoms.push("• Chest pain");
    if (diagnosis.bloodInSputum) symptoms.push("• Blood in sputum");
    if (diagnosis.fatigue) symptoms.push("• Fatigue");
    if (diagnosis.contactWithTb) symptoms.push("• Contact with TB patient");

    const symptomsText = symptoms.length ? symptoms.join("\n") : "• None";

    // 3. Generate report text
    const reportText = `
    Patient ID: ${diagnosis.patientId}
    Diagnosis ID: ${diagnosis.id}
    Symptoms:
    ${symptomsText}
    Tuberculosis Risk: ${diagnosis.result}
    `.trim();

    // 4. Save report
    return this.repo.create({
        patientId: diagnosis.patientId,
        diagnosisId: diagnosis.id,
        reportText,
    });
}


  async getReportsByPatient(patientId: string) {
    const patient = await this.patientRepo.findById(patientId);
    if (!patient) throw new AppError("Patient not found", 404, ErrorTypes.NOT_FOUND);
    return this.repo.findByPatientId(patientId);
  }
}

export default ReportService;
