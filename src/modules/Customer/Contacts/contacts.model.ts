import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const permissions: Schema = new Schema(
  {
    invoices: Boolean,
    estimates: Boolean,
    contracts: Boolean,
    proposals: Boolean,
    support: Boolean,
    projects: Boolean
  },
  { timestamps: true }
);

const emailNotifications = new Schema(
  {
    invoice: Boolean,
    estimate: Boolean,
    contract: Boolean,
    creditNote: Boolean,
    tickets: Boolean,
    project: Boolean,
    task: Boolean
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
    profileImageUrl: String,
    firstName: String,
    lastName: String,
    position: String,
    email: {
      type: String,
      unique: true
    },
    password: String,
    confirmPassword: String,
    phone: String,
    direction: String,
    isPrimaryContact: Boolean,
    sendWelcomeEmail: Boolean,
    sendSetPasswordEmail: Boolean,
    permissions: permissions,
    emailNotifications: emailNotifications
  },
  { timestamps: true }
);

contactsSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export default model('Contact', contactsSchema);
