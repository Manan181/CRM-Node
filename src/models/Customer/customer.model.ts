import { Schema, model } from 'mongoose';
import Address from './address.model';

const customerSchema: Schema = new Schema(
  {
    active: {
      type: Boolean,
      default: true
    },
    phone: {
      type: Number,
      minlength: 10,
      maxlength: 13,
      match: /^([+]\d{2}[ ])?\d{10}$/g
    },
    website: {
      type: String,
      maxlength: 100,
      match: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/g
    },
    groups: {
      type: Array,
      default: []
    },
    currency: {
      type: String,
      default: 'USD',
      enum: ['USD', 'EUR']
    },
    defaultLanguage: {
      type: String,
      default: 'en',
      enum: ['en', 'es']
    },
    company: {
      type: String,
      maxlength: 100,
      required: [true, 'Company is required']
    },
    vatNumber: {
      type: String
    },
    billingAddress: Address,
    shippingAddress: Address,
    customerAddress: Address
    /**
     * To-Do
     * Customer Admins
     */
  },
  { timestamps: true }
);

export default model('Customer', customerSchema);
