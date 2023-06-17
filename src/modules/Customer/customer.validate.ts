import Joi from 'joi';

// for validating create customer api
export const validateCustomerData = {
  data: Joi.object({
    active: Joi.boolean().default(true),
    phone: Joi.string().required(),
    website: Joi.string().uri(),
    groups: Joi.array().default([]),
    currency: Joi.string().default('USD').valid('USD', 'EUR'),
    defaultLanguage: Joi.string().default('en').valid('en', 'es'),
    company: Joi.string().max(100).required().messages({
      'any.required': 'Company is required',
      'string.max': 'Company exceeds the maximum length of 100 characters'
    }),
    vatNumber: Joi.string(),
    billingAddress: Joi.object({
      street: Joi.string().max(100),
      city: Joi.string().max(50),
      state: Joi.string().max(50),
      zipCode: Joi.string().max(10),
      country: Joi.string().max(50)
    }),
    shippingAddress: Joi.object({
      street: Joi.string().max(100),
      city: Joi.string().max(50),
      state: Joi.string().max(50),
      zipCode: Joi.string().max(10),
      country: Joi.string().max(50)
    }),
    customerAddress: Joi.object({
      street: Joi.string().max(100),
      city: Joi.string().max(50),
      state: Joi.string().max(50),
      zipCode: Joi.string().max(10),
      country: Joi.string().max(50)
    })
  })
};
