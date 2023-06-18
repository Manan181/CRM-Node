const Joi = require('joi');

// Notes Joi schema
export const validateNotesData = Joi.object({
  customerId: Joi.string().required().messages({ 'any.required': 'Customer Id is required' }),
  noteDescription: Joi.string().allow('').optional(),
  addedFrom: Joi.string().optional(),
  dateAdded: Joi.string().optional()
});

export const validateUpdateNoteData = Joi.object({
  noteDescription: Joi.string().allow('').optional()
});
