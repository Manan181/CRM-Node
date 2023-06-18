import { Document } from 'mongoose';

interface Permissions extends Document {
  bulkPdfExport: boolean;
  contracts: {
    viewOwn: boolean;
    viewGLobal: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  };
  creditNotes: {
    viewOwn: boolean;
    viewGLobal: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  };
  customers: {
    viewOwn: boolean;
    viewGLobal: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  };
  emailTemplates: {
    viewGLobal: boolean;
    edit: boolean;
  };
  estimates: {
    viewOwn: boolean;
    viewGLobal: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  };
  expenses: {
    viewOwn: boolean;
    viewGLobal: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  };
  invoices: {
    viewOwn: boolean;
    viewGLobal: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  };
  items: {
    viewGLobal: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  };
  knowledgeBase: {
    viewGLobal: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  };
  payments: {
    viewOwn: boolean;
    viewGLobal: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  };
  projects: {
    viewOwn: boolean;
    viewGLobal: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
    createTimesheets: boolean;
    editMilestones: boolean;
    deleteMilestones: boolean;
  };
  proposals: {
    viewOwn: boolean;
    viewGLobal: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  };
  reports: {
    viewGLobal: boolean;
    viewTimesheetsReport: boolean;
  };
  staffRoles: {
    viewGLobal: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  };
  settings: {
    viewGLobal: boolean;
    edit: boolean;
  };
  staff: {
    viewGLobal: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  };
  subscriptions: {
    viewOwn: boolean;
    viewGLobal: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  };
  tasks: {
    viewOwn: boolean;
    viewGLobal: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
    editTimesheetsGlobal: boolean;
    editOwnTimesheets: boolean;
    deleteTimesheetsGlobal: boolean;
    deleteOwnTimesheets: boolean;
  };
  taskChecklistTemplates: {
    create: boolean;
    delete: boolean;
  };
  estimateRequest: {
    viewOwn: boolean;
    viewGLobal: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  };
  leads: {
    viewGLobal: boolean;
    delete: boolean;
  };
  surveys: {
    viewGLobal: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  };
}
export default Permissions;
