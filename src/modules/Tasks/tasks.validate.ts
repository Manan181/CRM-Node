import Joi from 'joi';

// for validating create task api
export const validateTaskData = {
  data: Joi.object({
    public: Joi.boolean().default(false),
    billable: Joi.boolean().default(true),
    subject: Joi.string().required(),
    hourlyRate: Joi.number().default(0),
    startDate: Joi.string().required(),
    dueDate: Joi.string().optional(),
    fileUrl: Joi.string(),
    priority: Joi.string(),
    repeatEvery: Joi.string().default('nothingSelected'),
    customRepeatDuration: Joi.object({
      number: Joi.number().default(0),
      duration: Joi.string().default('')
    }),
    totalCycles: Joi.string(),
    relatedTo: Joi.string(),
    customerId: Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$')),
    assignees: Joi.array().items(Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$'))),
    followers: Joi.array().items(Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$'))),
    tags: Joi.array().items(Joi.string()),
    taskDescription: Joi.string().optional(),
    status: Joi.string().optional().valid('notStarted', 'inProgress', 'testing', 'awaitingFeedback', 'complete').default('inProgress')
  }).options({ allowUnknown: true })
};

export const validateUpdateTaskData = {
  data: Joi.object({
    public: Joi.boolean().default(false),
    billable: Joi.boolean().default(true),
    subject: Joi.string().required(),
    hourlyRate: Joi.number().default(0),
    startDate: Joi.string().required(),
    dueDate: Joi.string().optional(),
    priority: Joi.string(),
    repeatEvery: Joi.string().default('nothingSelected'),
    relatedTo: Joi.string(),
    tags: Joi.array().items(Joi.string()),
    taskDescription: Joi.string().optional()
  }).options({ allowUnknown: true })
};
