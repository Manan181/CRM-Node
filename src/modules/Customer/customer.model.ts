import { Schema, model } from 'mongoose';

const AddressSchema: Schema = new Schema({
  street: String,
  city: String,
  state: String,
  zipCode: String,
  country: String
});

const customerSchema: Schema = new Schema(
  {
    active: Boolean,
    phone: String,
    website: String,
    groups: Array,
    currency: String,
    defaultLanguage: String,
    company: String,
    vatNumber: String,
    billingAddress: AddressSchema,
    shippingAddress: AddressSchema,
    customerAddress: AddressSchema
  },
  { timestamps: true }
);

export default model('Customer', customerSchema);
