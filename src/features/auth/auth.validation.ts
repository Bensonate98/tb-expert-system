import Joi from 'joi';

export const signupSchema = Joi.object({
  fullName: Joi.string().required().messages({
    'string.base': 'Full name should be a text',
    'any.required': 'Full name is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email',
    'any.required': 'Email is required',
  }),
  password: Joi.string()
    .pattern(
      new RegExp('^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$')
    )
    .min(8)
    .max(30)
    .required()
    .messages({
      'string.pattern.base':
        'Password should be alphanumeric with special characters',
      'string.min': 'Password too short',
      'string.max': 'Password too long',
      'any.required': 'Password is required',
    }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email',
    'any.required': 'Email is required',
  }),
  password: Joi.string()
    .pattern(
      new RegExp('^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$')
    )
    .min(8)
    .max(30)
    .required()
    .messages({
      'string.pattern.base':
        'Password should be alphanumeric with special characters',
      'string.min': 'Password too short',
      'string.max': 'Password too long',
      'any.required': 'Password is required',
    }),
});

export const verifyEmailSchema = Joi.object({
  userId: Joi.string().uuid().required().messages({
    'string.base': 'User ID should be a string',
    'string.guid': 'Invalid User ID format',
    'any.required': 'User ID is required',
  }),

  otp: Joi.string()
    .length(6)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      'string.base': 'OTP should be a string',
      'string.length': 'OTP must be exactly 6 digits',
      'string.pattern.base': 'OTP must only contain numbers',
      'any.required': 'OTP is required',
    }),
});


export const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string()
    .min(20) 
    .required()
    .messages({
      "string.base": "Refresh token must be a string",
      "string.empty": "Refresh token is required",
      "string.min": "Refresh token is too short",
      "any.required": "Refresh token is required",
    }),
});
