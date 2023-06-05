import { Schema } from 'mongoose';

const PermissionsSchema: Schema = new Schema({
  bulkPdfExport: { type: Boolean, default: false },
  contracts: {
    viewOwn: { type: Boolean, default: false },
    viewGLobal: { type: Boolean, default: false },
    create: { type: Boolean, default: false },
    edit: { type: Boolean, default: false },
    delete: { type: Boolean, default: false }
  },
  creditNotes: {
    viewOwn: { type: Boolean, default: false },
    viewGLobal: { type: Boolean, default: false },
    create: { type: Boolean, default: false },
    edit: { type: Boolean, default: false },
    delete: { type: Boolean, default: false }
  },
  customers: {
    viewOwn: { type: Boolean, default: false },
    viewGLobal: { type: Boolean, default: false },
    create: { type: Boolean, default: false },
    edit: { type: Boolean, default: false },
    delete: { type: Boolean, default: false }
  },
  emailTemplates: {
    viewGLobal: { type: Boolean, default: false },
    edit: { type: Boolean, default: false }
  },
  estimates: {
    viewOwn: { type: Boolean, default: false },
    viewGLobal: { type: Boolean, default: false },
    create: { type: Boolean, default: false },
    edit: { type: Boolean, default: false },
    delete: { type: Boolean, default: false }
  },
  expenses: {
    viewOwn: { type: Boolean, default: false },
    viewGLobal: { type: Boolean, default: false },
    create: { type: Boolean, default: false },
    edit: { type: Boolean, default: false },
    delete: { type: Boolean, default: false }
  },
  invoices: {
    viewOwn: { type: Boolean, default: false },
    viewGLobal: { type: Boolean, default: false },
    create: { type: Boolean, default: false },
    edit: { type: Boolean, default: false },
    delete: { type: Boolean, default: false }
  },
  items: {
    viewGLobal: { type: Boolean, default: false },
    create: { type: Boolean, default: false },
    edit: { type: Boolean, default: false },
    delete: { type: Boolean, default: false }
  },
  knowledgeBase: {
    viewGLobal: { type: Boolean, default: false },
    create: { type: Boolean, default: false },
    edit: { type: Boolean, default: false },
    delete: { type: Boolean, default: false }
  },
  payments: {
    viewOwn: { type: Boolean, default: false },
    viewGLobal: { type: Boolean, default: false },
    create: { type: Boolean, default: false },
    edit: { type: Boolean, default: false },
    delete: { type: Boolean, default: false }
  },
  projects: {
    viewOwn: { type: Boolean, default: false },
    viewGLobal: { type: Boolean, default: false },
    create: { type: Boolean, default: false },
    edit: { type: Boolean, default: false },
    delete: { type: Boolean, default: false },
    createTimesheets: { type: Boolean, default: false },
    editMilestones: { type: Boolean, default: false },
    deleteMilestones: { type: Boolean, default: false }
  },
  proposals: {
    viewOwn: { type: Boolean, default: false },
    viewGLobal: { type: Boolean, default: false },
    create: { type: Boolean, default: false },
    edit: { type: Boolean, default: false },
    delete: { type: Boolean, default: false }
  },
  reports: {
    viewGLobal: { type: Boolean, default: false },
    viewTimesheetsReport: { type: Boolean, default: false }
  },
  staffRoles: {
    viewGLobal: { type: Boolean, default: false },
    create: { type: Boolean, default: false },
    edit: { type: Boolean, default: false },
    delete: { type: Boolean, default: false }
  },
  settings: {
    viewGLobal: { type: Boolean, default: false },
    edit: { type: Boolean, default: false }
  },
  staff: {
    viewGLobal: { type: Boolean, default: false },
    create: { type: Boolean, default: false },
    edit: { type: Boolean, default: false },
    delete: { type: Boolean, default: false }
  },
  subscriptions: {
    viewOwn: { type: Boolean, default: false },
    viewGLobal: { type: Boolean, default: false },
    create: { type: Boolean, default: false },
    edit: { type: Boolean, default: false },
    delete: { type: Boolean, default: false }
  },
  tasks: {
    viewOwn: { type: Boolean, default: false },
    viewGLobal: { type: Boolean, default: false },
    create: { type: Boolean, default: false },
    edit: { type: Boolean, default: false },
    delete: { type: Boolean, default: false },
    editTimesheetsGlobal: { type: Boolean, default: false },
    editOwnTimesheets: { type: Boolean, default: false },
    deleteTimesheetsGlobal: { type: Boolean, default: false },
    deleteOwnTimesheets: { type: Boolean, default: false }
  },
  taskChecklistTemplates: {
    create: { type: Boolean, default: false },
    delete: { type: Boolean, default: false }
  },
  estimateRequest: {
    viewOwn: { type: Boolean, default: false },
    viewGLobal: { type: Boolean, default: false },
    create: { type: Boolean, default: false },
    edit: { type: Boolean, default: false },
    delete: { type: Boolean, default: false }
  },
  leads: {
    viewGLobal: { type: Boolean, default: false },
    delete: { type: Boolean, default: false }
  },
  surveys: {
    viewGLobal: { type: Boolean, default: false },
    create: { type: Boolean, default: false },
    edit: { type: Boolean, default: false },
    delete: { type: Boolean, default: false }
  }
});

export default PermissionsSchema;
