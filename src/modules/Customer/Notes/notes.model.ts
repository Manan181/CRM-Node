import { Schema, model } from 'mongoose';

const noteSchema: Schema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      required: [true, 'Customer Id is required'],
      ref: 'Customer'
    },
    noteDescription: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
);

export default model('Note', noteSchema);
