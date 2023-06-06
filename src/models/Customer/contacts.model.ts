import { Schema, model } from 'mongoose';

const permissions: Schema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      required: [true, 'Customer Id is required'],
      ref: 'Customer'
    },
    isPrimary: {
      type: Boolean,
      required: true
    },
    invoices: {
      type: Boolean,
      required: false,
      default: true
    },
    estimates: {
      type: Boolean,
      required: false,
      default: true
    },
    contracts: {
      type: Boolean,
      required: false,
      default: true
    },
    proposals: {
      type: Boolean,
      required: false,
      default: true
    },
    support: {
      type: Boolean,
      required: false,
      default: true
    },
    projects: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  { timestamps: true }
);

const emailNotifications = new Schema(
  {
    invoice: {
      type: Boolean,
      required: false,
      default: true
    },
    estimate: {
      type: Boolean,
      required: false,
      default: true
    },
    contract: {
      type: Boolean,
      required: false,
      default: true
    },
    creditNote: {
      type: Boolean,
      required: false,
      default: true
    },
    tickets: {
      type: Boolean,
      required: false,
      default: true
    },
    project: {
      type: Boolean,
      required: false,
      default: true
    },
    task: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  { timestamps: true }
);

const contactsSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      required: [true, 'Customer Id is required'],
      ref: 'Customer'
    },
    profileImage: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    position: {
      type: String,
      required: false
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: false
    },
    direction: {
      type: String,
      required: false
    },
    primaryContact: {
      type: Boolean,
      required: false
    },
    sendWelcomeEmail: {
      type: Boolean,
      required: false
    },
    sendSetPasswordEmail: {
      type: Boolean,
      required: false
    },
    permissions: permissions,
    emailNotifications: emailNotifications
  },
  { timestamps: true }
);

export default model('Contact', contactsSchema);
