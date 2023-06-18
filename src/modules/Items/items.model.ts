import { Schema, model } from 'mongoose';

const itemSchema = new Schema({
  description: String,
  longDescription: String,
  rate: Number,
  tax1: String,
  tax2: String,
  unit: String,
  itemGroup: {
    type: Schema.Types.ObjectId,
    ref: 'ItemGroup'
  }
});

export default model('Item', itemSchema);
