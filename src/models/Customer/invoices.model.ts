import { Schema, model } from 'mongoose';
import Address from './address.model';

const invoiceSchema: Schema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      required: [true, 'Customer Id is required'],
      ref: 'Customer'
    },
    billTo: Address,
    shipTo: Address,
    invoiceNumber: {
      type: String,
      required: [true, 'Invoice Number is required']
    },
    invoiceDate: {
      type: Date,
      required: [true, 'Invoice Date is required']
    },
    dueDate: {
      type: Date,
      required: [true, 'Due Date is required']
    },
    preventOverdueReminders: {
      type: Boolean,
      default: false
    },
    tags: [], // To-Do
    paymentModes: [], // To-Do
    currency: {
      type: String,
      default: 'USD',
      enum: ['USD', 'EUR']
    },
    saleAgent: {} // To-Do
  },
  { timestamps: true }
);

export default model('Invoice', invoiceSchema);
