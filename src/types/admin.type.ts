import mongoose, { Document } from 'mongoose';

interface Admin extends Document {
  id: mongoose.Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  tokenExpireTime: Date;
  resetToken: string;
  isEnabled: boolean;
  isDeleted: boolean;
}
export default Admin;
