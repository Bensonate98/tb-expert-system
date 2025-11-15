import Joi from "joi";

export const generateReportSchema = Joi.object({
  diagnosisId: Joi.string()
      .required()
      .messages({
        "string.base": "Diagnosis ID must be a string",
        "string.empty": "Diagnosis ID is required",
        "any.required": "Diagnosis ID is required",
      }),
});