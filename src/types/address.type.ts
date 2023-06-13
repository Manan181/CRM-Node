import mongoose, { Document } from 'mongoose';

interface Address extends Document {
  id: mongoose.Schema.Types.ObjectId;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}
export default Address;
