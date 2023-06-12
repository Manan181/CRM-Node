import Joi from 'joi';

// for staff register purposes
export const validateStaffData = {
  data: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    profileImage: Joi.string(),
    hourlyRate: Joi.number(),
    phone: Joi.string(),
    facebookUrl: Joi.string().default(''),
    linkedinUrl: Joi.string().default(''),
    skypeUrl: Joi.string().default(''),
    defaultLanguage: Joi.string(),
    emailSignature: Joi.string().default(''),
    direction: Joi.string(),
    isAdministrator: Joi.boolean(),
    sendWelcomeEmail: Joi.boolean(),
    role: Joi.any(),
    permissions: Joi.object()
  })
};

// for staff login purposes
export const validateStaffLoginData = {
  data: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(36).required()
  })
};
