import { Schema, model } from 'mongoose';

const proposalsSchema = new Schema(
  {
    subject: String,
    related: String,
    customerId: { type: Schema.Types.ObjectId, ref: 'Customer' },
    leadId: { type: Schema.Types.ObjectId, ref: 'Lead' },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project'
    },
    date: String,
    openTill: String,
    currency: String,
    discountType: String,
    tags: [String],
    allowComments: Boolean,
    status: String,
    assigned: {
      type: Schema.Types.ObjectId,
      ref: 'Staff'
    },
    to: String,
    address: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    email: String,
    phone: String,
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Item'
      }
    ]
  },
  { timestamps: true }
);

export default model('Proposal', proposalsSchema);
