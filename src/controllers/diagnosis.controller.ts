import { injectable } from 'tsyringe';
import { NextFunction, Request, Response } from 'express';
import successResponse from '../utils/apiResponse';
import DiagnosisService from '../services/diagnosis.service';

@injectable()
class DiagnosisController {
  constructor(private readonly diagnosis: DiagnosisService) {}

  createDiagnosis = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
        const data = req.body;
        const diagnosis = await this.diagnosis.createDiagnosis(data);
        successResponse(
          res,
           201, 
          'Diagnosis created successfully', 
          diagnosis
        );
    } catch (error) {
      next(error);
    }
  }

  getPatientDiagnosis = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
        const { patientId } = req.params;
        const diagnosis = await this.diagnosis.getDiagnosesByPatient(patientId);
        successResponse(
          res,
           200, 
          'Diagnoses retrieved successfully', 
          diagnosis
        );
    } catch (error) {
      next(error);
    }
  }
}

export default DiagnosisController;
