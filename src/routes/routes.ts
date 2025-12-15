import { Router } from 'express';
import { container } from 'tsyringe';
import PatientController from '../controllers/patients.controller';
import validateRequest from '../middlewares/validate';
import { registerPatientSchema } from '../validation/patient.validation';
import DiagnosisController from '../controllers/diagnosis.controller';
import { CreateDiagnosisSchema } from '../validation/diagnosis.validation';
import ReportController from '../controllers/report.controller';
import { generateReportSchema } from '../validation/report.validation';

const router = Router();

const patientController = container.resolve(PatientController);
const diagnosisController = container.resolve(DiagnosisController);
const reportController = container.resolve(ReportController);

/* 
    Patients Routes 
*/
router.post(
    "/patients", 
    validateRequest(registerPatientSchema), 
    patientController.register
);
router.get(
    "/patients", 
    patientController.fetchAllPatients
);
router.get(
    "/patients/:patientId", 
    patientController.fetchPatient
);
router.get(
    "/patients/code/:patientCode", 
    patientController.fetchPatientByCode
);

/* 
    Diagnosis Routes 
*/
router.post(
    "/diagnoses",
    validateRequest(CreateDiagnosisSchema), 
    diagnosisController.createDiagnosis
);
router.get(
    "/diagnoses/patient/:patientId", 
    diagnosisController.getPatientDiagnosis
);

/* 
    Report Routes 
*/
router.post(
    "/reports", 
    validateRequest(generateReportSchema),
    reportController.generate
);
router.get(
    "/reports/patient/:patientId", 
    reportController.getByPatient
);

router.delete(
    "/patients/:patientId",
    patientController.deletePatient
);

export default router;
