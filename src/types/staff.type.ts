import mongoose, { Document } from 'mongoose';
import StaffRole from './role.staff.type';

interface Staff extends Document {
  id: mongoose.Schema.Types.ObjectId;
  profileImage?: string;
  firstName: string;
  lastName: string;
  email: string;
  hourlyRate?: number;
  phone?: number;
  facebookUrl?: string;
  linkedinUrl?: string;
  skypeUrl?: string;
  defaultLanguage?: string;
  emailSignature?: string;
  direction?: string;
  isAdmintrator?: boolean;
  sendWelcomeEmail?: boolean;
  password: string;
  role: StaffRole; // Replace 'any' with the actual type for permissions
}

export default Staff;
