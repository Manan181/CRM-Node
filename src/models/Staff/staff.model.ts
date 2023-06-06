import mongoose, { Schema } from 'mongoose';
import Permissions from '../permissions.model';

const permissionsSchema = {
  permissions: Permissions
};

const staffSchema: Schema = new Schema(
  {
    profileImage: String,
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    hourlyRate: Number,
    phone: Number,
    facebookUrl: String,
    linkedinUrl: String,
    skypeUrl: String,
    defaultLanguage: String,
    emailSignature: String,
    direction: String,
    isAdmintrator: Boolean,
    sendWelcomeEmail: Boolean,
    password: {
      type: String,
      required: true
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: 'Role',
      required: false
    }
  },
  { timestamps: true }
);

staffSchema.add(permissionsSchema);

export default mongoose.model('Staff', staffSchema);
