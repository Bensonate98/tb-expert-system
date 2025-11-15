import { injectable } from 'tsyringe';
import { NextFunction, Request, Response } from 'express';
import PatientService from '../services/patient.service';
import { CreatePatientDto } from '../types/dto';
import successResponse from '../utils/apiResponse';

@injectable()
class PatientController {
  constructor(private readonly patient: PatientService) {}

  register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
        const data = req.body as CreatePatientDto;
        const newPatient = await this.patient.register(data);
        successResponse(
            res, 
            201, 
            "Patient registered successfully",
            newPatient
        );
    } catch (error) {
      next(error);
    }
  }

  fetchAllPatients = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
        const patients = await this.patient.fetcAllPatients();
        successResponse(
            res, 
            200, 
            "Patients retrieved successfully",
            patients
        );
    } catch (error) {
      next(error);
    }
  }

  fetchPatient = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
        const { patientId } = req.params;
        const patient = await this.patient.fetchPatient(patientId);
        successResponse(
            res, 
            200, 
            "Patient retrieved successfully",
            patient
        );
    } catch (error) {
      next(error);
    }
  }

  fetchPatientByCode = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
        const { patientCode } = req.params;
        const patient = await this.patient.fetchPatientByCode(patientCode);
        successResponse(
            res, 
            200, 
            "Patient retrieved successfully",
            patient
        );
    } catch (error) {
      next(error);
    }
  }
}

export default PatientController;
