import Joi from "joi"; 

export const CreateDiagnosisSchema = Joi.object({
  patientId: Joi.string()
    .required()
    .messages({
      "string.base": "Patient ID must be a string",
      "string.empty": "Patient ID is required",
      "any.required": "Patient ID is required",
    }),

  cough2Weeks: Joi.boolean()
    .required()
    .messages({
      "boolean.base": "cough2Weeks must be a boolean",
      "any.required": "cough2Weeks is required",
    }),

  nightSweat: Joi.boolean()
    .required()
    .messages({
      "boolean.base": "nightSweat must be a boolean",
      "any.required": "nightSweat is required",
    }),

  weightLoss: Joi.boolean()
    .required()
    .messages({
      "boolean.base": "weightLoss must be a boolean",
      "any.required": "weightLoss is required",
    }),

  fever: Joi.boolean()
    .required()
    .messages({
      "boolean.base": "fever must be a boolean",
      "any.required": "fever is required",
    }),

  chestPain: Joi.boolean()
    .required()
    .messages({
      "boolean.base": "chestPain must be a boolean",
      "any.required": "chestPain is required",
    }),

  bloodInSputum: Joi.boolean()
    .required()
    .messages({
      "boolean.base": "bloodInSputum must be a boolean",
      "any.required": "bloodInSputum is required",
    }),

  fatigue: Joi.boolean().optional().messages({
    "boolean.base": "fatigue must be a boolean",
  }),

  contactWithTb: Joi.boolean().optional().messages({
    "boolean.base": "contactWithTb must be a boolean",
  }),
});
