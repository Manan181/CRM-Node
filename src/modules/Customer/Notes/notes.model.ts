import { Schema, model } from 'mongoose';

const noteSchema: Schema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      required: [true, 'Customer Id is required'],
      ref: 'Customer'
    },
    noteDescription: String,
    addedFrom: String,
    dateAdded: String
  },
  { timestamps: true }
);

export default model('Note', noteSchema);
