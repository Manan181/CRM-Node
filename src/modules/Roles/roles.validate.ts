import Joi from 'joi';

// for validating create roles api
export const validateRolesSchema = {
  data: Joi.object({
    roleName: Joi.string().required(),
    permissions: Joi.object({
      bulkPdfExport: Joi.boolean().default(false),
      contracts: Joi.object({
        viewOwn: Joi.boolean().default(false),
        viewGLobal: Joi.boolean().default(false),
        create: Joi.boolean().default(false),
        edit: Joi.boolean().default(false),
        delete: Joi.boolean().default(false)
      }),
      creditNotes: Joi.object({
        viewOwn: Joi.boolean().default(false),
        viewGLobal: Joi.boolean().default(false),
        create: Joi.boolean().default(false),
        edit: Joi.boolean().default(false),
        delete: Joi.boolean().default(false)
      }),
      customers: Joi.object({
        viewOwn: Joi.boolean().default(false),
        viewGLobal: Joi.boolean().default(false),
        create: Joi.boolean().default(false),
        edit: Joi.boolean().default(false),
        delete: Joi.boolean().default(false)
      }),
      emailTemplates: Joi.object({
        viewGLobal: Joi.boolean().default(false),
        edit: Joi.boolean().default(false)
      }),
      estimates: Joi.object({
        viewOwn: Joi.boolean().default(false),
        viewGLobal: Joi.boolean().default(false),
        create: Joi.boolean().default(false),
        edit: Joi.boolean().default(false),
        delete: Joi.boolean().default(false)
      }),
      expenses: Joi.object({
        viewOwn: Joi.boolean().default(false),
        viewGLobal: Joi.boolean().default(false),
        create: Joi.boolean().default(false),
        edit: Joi.boolean().default(false),
        delete: Joi.boolean().default(false)
      }),
      invoices: Joi.object({
        viewOwn: Joi.boolean().default(false),
        viewGLobal: Joi.boolean().default(false),
        create: Joi.boolean().default(false),
        edit: Joi.boolean().default(false),
        delete: Joi.boolean().default(false)
      }),
      items: Joi.object({
        viewGLobal: Joi.boolean().default(false),
        create: Joi.boolean().default(false),
        edit: Joi.boolean().default(false),
        delete: Joi.boolean().default(false)
      }),
      knowledgeBase: Joi.object({
        viewGLobal: Joi.boolean().default(false),
        create: Joi.boolean().default(false),
        edit: Joi.boolean().default(false),
        delete: Joi.boolean().default(false)
      }),
      payments: Joi.object({
        viewOwn: Joi.boolean().default(false),
        viewGLobal: Joi.boolean().default(false),
        create: Joi.boolean().default(false),
        edit: Joi.boolean().default(false),
        delete: Joi.boolean().default(false)
      }),
      projects: Joi.object({
        viewOwn: Joi.boolean().default(false),
        viewGLobal: Joi.boolean().default(false),
        create: Joi.boolean().default(false),
        edit: Joi.boolean().default(false),
        delete: Joi.boolean().default(false),
        createTimesheets: Joi.boolean().default(false),
        editMilestones: Joi.boolean().default(false),
        deleteMilestones: Joi.boolean().default(false)
      }),
      proposals: Joi.object({
        viewOwn: Joi.boolean().default(false),
        viewGLobal: Joi.boolean().default(false),
        create: Joi.boolean().default(false),
        edit: Joi.boolean().default(false),
        delete: Joi.boolean().default(false)
      }),
      reports: Joi.object({
        viewGLobal: Joi.boolean().default(false),
        viewTimesheetsReport: Joi.boolean().default(false)
      }),
      staffRoles: Joi.object({
        viewGLobal: Joi.boolean().default(false),
        create: Joi.boolean().default(false),
        edit: Joi.boolean().default(false),
        delete: Joi.boolean().default(false)
      }),
      settings: Joi.object({
        viewGLobal: Joi.boolean().default(false),
        edit: Joi.boolean().default(false)
      }),
      staff: Joi.object({
        viewGLobal: Joi.boolean().default(false),
        create: Joi.boolean().default(false),
        edit: Joi.boolean().default(false),
        delete: Joi.boolean().default(false)
      }),
      subscriptions: Joi.object({
        viewOwn: Joi.boolean().default(false),
        viewGLobal: Joi.boolean().default(false),
        create: Joi.boolean().default(false),
        edit: Joi.boolean().default(false),
        delete: Joi.boolean().default(false)
      }),
      tasks: Joi.object({
        viewOwn: Joi.boolean().default(false),
        viewGLobal: Joi.boolean().default(false),
        create: Joi.boolean().default(false),
        edit: Joi.boolean().default(false),
        delete: Joi.boolean().default(false),
        editTimesheetsGlobal: Joi.boolean().default(false),
        editOwnTimesheets: Joi.boolean().default(false),
        deleteTimesheetsGlobal: Joi.boolean().default(false),
        deleteOwnTimesheets: Joi.boolean().default(false)
      }),
      taskChecklistTemplates: Joi.object({
        create: Joi.boolean().default(false),
        delete: Joi.boolean().default(false)
      }),
      estimateRequest: Joi.object({
        viewOwn: Joi.boolean().default(false),
        viewGLobal: Joi.boolean().default(false),
        create: Joi.boolean().default(false),
        edit: Joi.boolean().default(false),
        delete: Joi.boolean().default(false)
      }),
      leads: Joi.object({
        viewGLobal: Joi.boolean().default(false),
        delete: Joi.boolean().default(false)
      }),
      surveys: Joi.object({
        viewGLobal: Joi.boolean().default(false),
        create: Joi.boolean().default(false),
        edit: Joi.boolean().default(false),
        delete: Joi.boolean().default(false)
      })
    })
  })
};
