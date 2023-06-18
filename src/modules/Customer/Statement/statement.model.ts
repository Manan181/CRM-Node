import { Schema, model } from 'mongoose';

const statementSchema: Schema = new Schema(
  {
    customerName: String,
    beginningBalance: Number,
    invoicedAmount: Number,
    amountPaid: Number,
    balanceDue: Number
  },
  { timestamps: true }
);

export default model('Statement', statementSchema);
