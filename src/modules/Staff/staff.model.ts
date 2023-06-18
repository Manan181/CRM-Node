import { Model, Schema, model } from 'mongoose';
import Permissions from '../permissions.model';
import bcrypt from 'bcryptjs';
import IStaff from '../../types/staff.type';

const permissionsSchema = {
  permissions: Permissions
};

const staffSchema: Schema = new Schema<IStaff, StaffModel>(
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
    isAdministrator: Boolean,
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
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

interface StaffModel extends Model<IStaff> {
  // eslint-disable-next-line no-unused-vars
  login: (email: string, password: string) => any;
}

// static method to login admin
staffSchema.statics.login = async function (email: string, password: string) {
  const staff = await this.findOne({ email });
  if (staff) {
    const auth = await bcrypt.compare(password, staff.password);
    if (auth) {
      return staff;
    }
    throw Error('Incorrect Password');
  }
  throw Error('Incorrect Email');
};

export default model<IStaff, StaffModel>('Staff', staffSchema);
