import mongoose, { Schema } from 'mongoose';
import Permissions from '../permissions.model';
import bcrypt from 'bcryptjs';

const permissionsSchema = {
  permissions: Permissions
};

const staffSchema: Schema = new Schema(
  {
    profileImage: String,
    firstName: String,
    lastName: String,
    email: {
      type: String,
      unique: true
    },
    hourlyRate: Number,
    phone: String,
    facebookUrl: String,
    linkedinUrl: String,
    skypeUrl: String,
    defaultLanguage: String,
    emailSignature: String,
    direction: String,
    isAdmintrator: Boolean,
    sendWelcomeEmail: Boolean,
    password: String,
    role: {
      type: Schema.Types.ObjectId,
      ref: 'Role'
    }
  },
  { timestamps: true }
);

staffSchema.add(permissionsSchema);

staffSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export default mongoose.model('Staff', staffSchema);
