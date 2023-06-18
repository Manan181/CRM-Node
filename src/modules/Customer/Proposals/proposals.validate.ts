import Joi from 'joi';

export const validateProposalsData = {
  data: Joi.object({
    subject: Joi.string().required(),
    related: Joi.string().valid('customer', 'lead'),
    customerId: Joi.when('related', {
      is: 'Customer',
      then: Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$')),
      otherwise: Joi.string().allow('')
    }),
    leadId: Joi.when('related', {
      is: 'Lead',
      then: Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$')),
      otherwise: Joi.string().allow('')
    }),
    project: Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$')),
    date: Joi.string().required(),
    openTill: Joi.string(),
    currency: Joi.string().required(),
    discountType: Joi.string().valid('noDiscount', 'beforeTax', 'afterTax'),
    tags: Joi.array().items(Joi.string()),
    allowComments: Joi.boolean(),
    status: Joi.string().valid('draft', 'send', 'open', 'revised', 'declined', 'accepted'),
    assigned: Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$')),
    to: Joi.string().required(),
    address: Joi.string().allow(''),
    city: Joi.string(),
    state: Joi.string(),
    zipCode: Joi.string(),
    country: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
    itemIds: Joi.array().items(Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$'))),
    items: Joi.array().items(
      Joi.object({
        description: Joi.string(),
        longDescription: Joi.string(),
        qtyOrHours: Joi.number(),
        unit: Joi.string(),
        rate: Joi.number(),
        tax: Joi.number(),
        amount: Joi.number()
      })
    ),
    subTotal: Joi.number().optional().default(0),
    discount: Joi.object({
      number: Joi.number().optional().default(0),
      type: Joi.string().valid('percent', 'fixed').default('percent')
    }),
    adjustment: Joi.number().optional().default(0),
    total: Joi.number().optional().default(0)
  }).options({ allowUnknown: true })
};

export const validateUpdateProposalData = {
  data: Joi.object({
    //
  }).options({ allowUnknown: true })
};
