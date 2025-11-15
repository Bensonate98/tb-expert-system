import { injectable } from 'tsyringe';
import { NextFunction, Request, Response } from 'express';
import successResponse from '../utils/apiResponse';
import ReportService from '../services/report.service';

@injectable()
class ReportController {
  constructor(private readonly report: ReportService) {}

  generate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
        const { diagnosisId } = req.body;
        const report = await this.report.generateReport(diagnosisId);
        successResponse(
          res,
           201, 
          'Report generated successfully', 
          report
        );
    } catch (error) {
      next(error);
    }
  }

  getByPatient = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
        const { patientId } = req.params;
        const reports = await this.report.getReportsByPatient(patientId);
        successResponse(
          res,
           200, 
          'Report retrieved successfully', 
          reports
        );
    } catch (error) {
      next(error);
    }
  }
}

export default ReportController;
