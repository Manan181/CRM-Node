import mongoose, { Schema } from 'mongoose';

const noteSchema: Schema = new Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Customer Id is required'],
      ref: 'customer'
    },
    noteDescription: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
);

export default mongoose.model('note', noteSchema);
