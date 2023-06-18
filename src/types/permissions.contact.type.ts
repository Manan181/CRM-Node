import mongoose, { Document } from 'mongoose';

interface Permissions extends Document {
  id: mongoose.Schema.Types.ObjectId;
  customerId: mongoose.Schema.Types.ObjectId;
  isPrimary: boolean;
  invoices?: boolean;
  estimates?: boolean;
  contracts?: boolean;
  proposals?: boolean;
  support?: boolean;
  projects?: boolean;
}
export default Permissions;
