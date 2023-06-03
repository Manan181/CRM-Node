import mongoose, { Document, Schema } from 'mongoose';

const AddressSchema: Schema = new Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Customer Id is required'],
    ref: 'customer'
  },
  street: {
    type: String,
    maxlength: 100
  },
  city: {
    type: String,
    maxlength: 100
  },
  state: {
    type: String,
    maxlength: 100
  },
  zipCode: {
    type: String,
    maxlength: 100
  },
  country: {
    type: String,
    maxlength: 100
  }
});

export default AddressSchema;