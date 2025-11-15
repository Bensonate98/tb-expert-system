import Joi from "joi";

export const registerPatientSchema = Joi.object({
  fullName: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.base": "Full name must be a string",
      "string.empty": "Full name is required",
      "string.min": "Full name should have at least 3 characters",
      "string.max": "Full name should have at most 100 characters",
      "any.required": "Full name is required",
    }),
  
  age: Joi.number()
    .integer()
    .min(0)
    .max(120)
    .required()
    .messages({
      "number.base": "Age must be a number",
      "number.integer": "Age must be an integer",
      "number.min": "Age cannot be negative",
      "number.max": "Age seems invalid",
      "any.required": "Age is required",
    }),
  
  gender: Joi.string()
    .valid("male", "female")
    .required()
    .messages({
      "any.only": "Gender must be either 'male', 'female'",
      "any.required": "Gender is required",
    }),
  
  phone: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number must contain 10 to 15 digits",
      "any.required": "Phone number is required",
    }),
  
  address: Joi.string()
    .min(5)
    .max(200)
    .required()
    .messages({
      "string.base": "Address must be a string",
      "string.empty": "Address is required",
      "string.min": "Address should have at least 5 characters",
      "string.max": "Address should have at most 200 characters",
      "any.required": "Address is required",
    }),
});
