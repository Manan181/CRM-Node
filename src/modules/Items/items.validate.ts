import Joi from 'joi';

// for validating create item api
export const validateItemData = {
  data: Joi.object({
    description: Joi.string().required(),
    longDescription: Joi.string(),
    rate: Joi.number().required,
    tax1: Joi.string(),
    tax2: Joi.string(),
    unit: Joi.string(),
    itemGroup: Joi.string()
  })
};
