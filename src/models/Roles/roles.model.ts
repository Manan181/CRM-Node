import mongoose, { Schema } from 'mongoose';

const staffSchema: Schema = new Schema(
  {
    profileImage: {
      type: String,
      required: false
    },
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
    hourlyRate: {
      type: Number,
      required: false
    },
    phone: {
      type: Number,
      required: false
    },
    facebookUrl: {
      type: String,
      required: false
    },
    linkedinUrl: {
      type: String,
      required: false
    },
    skypeUrl: {
      type: String,
      required: false
    },
    defaultLanguage: {
      type: String,
      required: false
    },
    emailSignature: {
      type: String,
      required: false
    },
    direction: {
      type: String,
      required: false
    },
    isAdmintrator: {
      type: Boolean,
      required: false
    },
    sendWelcomeEmail: {
      type: Boolean,
      required: false
    },
    password: {
      type: String,
      required: true
    },
    permissions: [{}]
  },
  { timestamps: true }
);

export default mongoose.model('staff', staffSchema);
