import Joi from 'joi';

// for validating create contacts api
export const validateContactsData = {
  data: Joi.object({
    customerId: Joi.string().required().messages({
      'any.required': 'Customer Id is required',
      'string.empty': 'Customer Id is required'
    }),
    profileImageUrl: Joi.string(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    position: Joi.string(),
    email: Joi.string().email().required().messages({
      'any.required': 'Email is required',
      'string.empty': 'Email is required',
      'string.email': 'Please enter a valid email address'
    }),
    password: Joi.when('sendSetPasswordEmail', {
      is: false,
      then: Joi.required(),
      otherwise: Joi.optional()
    }),
    phone: Joi.string().required(),
    direction: Joi.string(),
    isPrimaryContact: Joi.boolean(),
    sendWelcomeEmail: Joi.boolean(),
    sendSetPasswordEmail: Joi.boolean(),
    permissions: Joi.object({
      invoices: Joi.boolean().default(true),
      estimates: Joi.boolean().default(true),
      contracts: Joi.boolean().default(true),
      proposals: Joi.boolean().default(true),
      support: Joi.boolean().default(true),
      projects: Joi.boolean().default(true)
    }),
    emailNotifications: Joi.object({
      invoice: Joi.boolean().default(true),
      estimate: Joi.boolean().default(true),
      contract: Joi.boolean().default(true),
      creditNote: Joi.boolean().default(true),
      tickets: Joi.boolean().default(true),
      project: Joi.boolean().default(true),
      task: Joi.boolean().default(true)
    })
  }).options({ abortEarly: false })
};

// for validating update contacts api
export const validateUpdateContactData = {
  data: Joi.object({
    profileImageUrl: Joi.string(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    position: Joi.string(),
    email: Joi.string().email().messages({
      'string.email': 'Please enter a valid email address'
    }),
    password: Joi.string().default(''),
    phone: Joi.string(),
    direction: Joi.string(),
    isPrimaryContact: Joi.boolean(),
    sendSetPasswordEmail: Joi.boolean().default(false),
    permissions: Joi.object({
      invoices: Joi.boolean(),
      estimates: Joi.boolean(),
      contracts: Joi.boolean(),
      proposals: Joi.boolean(),
      support: Joi.boolean(),
      projects: Joi.boolean()
    }),
    emailNotifications: Joi.object({
      invoice: Joi.boolean(),
      estimate: Joi.boolean(),
      contract: Joi.boolean(),
      creditNote: Joi.boolean(),
      tickets: Joi.boolean(),
      project: Joi.boolean(),
      task: Joi.boolean()
    })
  })
    .min(1)
    .options({ abortEarly: false })
};

// for validating contact reset password api
export const validateContactPassword = {
  data: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
  })
};
