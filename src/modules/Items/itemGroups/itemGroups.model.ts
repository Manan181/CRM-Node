import { Schema, model } from 'mongoose';

const itemGroupSchema: Schema = new Schema(
  {
    groupName: String
  },
  { timestamps: true }
);

export default model('ItemGroup', itemGroupSchema);
