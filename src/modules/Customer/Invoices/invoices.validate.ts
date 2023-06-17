// for validating the create invoices api

import Joi from 'joi';

export const validateCreateInvoice = {
  data: Joi.object({
    customerId: Joi.string().required().messages({
      'any.required': 'Customer Id is required'
    }),
    billTo: Joi.object({
      street: Joi.string(),
      city: Joi.string(),
      state: Joi.string().max(100),
      zipCode: Joi.string().max(100),
      country: Joi.string().max(100)
    }),
    shipTo: Joi.object({
      street: Joi.string(),
      city: Joi.string(),
      state: Joi.string().max(100),
      zipCode: Joi.string().max(100),
      country: Joi.string().max(100)
    }),
    invoiceNumber: Joi.string().required().messages({
      'any.required': 'Invoice Number is required'
    }),
    invoiceDate: Joi.date().required().messages({
      'any.required': 'Invoice Date is required'
    }),
    dueDate: Joi.date().required().messages({
      'any.required': 'Due Date is required'
    }),
    preventSendingOverdueReminders: Joi.boolean().default(false),
    tags: Joi.array().items(Joi.string()),
    paymentModes: Joi.array().items(Joi.string()),
    currency: Joi.string().valid('USD', 'EUR').default('USD'),
    saleAgent: Joi.object().unknown(true),
    recurringInvoice: Joi.string(),
    customRecurringDuration: Joi.when('recurringInvoice', {
      is: 'custom',
      then: Joi.object({
        number: Joi.number().default(1),
        duration: Joi.string().default('days')
      }),
      otherwise: Joi.object().optional()
    }),
    discountType: Joi.string(),
    totalCycles: Joi.number(),
    adminNote: Joi.string()
  }).options({ allowUnknown: true })
};
