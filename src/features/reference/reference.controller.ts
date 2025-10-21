import { NextFunction, Request, Response } from "express";
import successResponse from "../../shared/utils/apiResponse";
import { injectable } from "tsyringe";
import ReferenceService from "./reference.service";

@injectable()
class ReferenceController {
  constructor(
    private readonly refService: ReferenceService,
  ) {}

  fetchCourses = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courses = await this.refService.fetchCourses();
      successResponse(res, 200, "Courses retrieved successfully", { courses });
    }
    catch(err) {
      next(err)
    }
  }

  fetchInstitutions = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const institutions = await this.refService.fetchInstitutions();
      successResponse(res, 200, "Institutions retrieved successfully", { institutions });
    }
    catch(err) {
      next(err)
    }
  }
}

export default ReferenceController;