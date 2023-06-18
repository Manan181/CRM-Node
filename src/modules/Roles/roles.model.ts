import { Schema, model } from 'mongoose';
import Permissions from '../permissions.model';

const permissionsSchema = {
  permissions: Permissions
};

const rolesSchema: Schema = new Schema(
  {
    roleName: {
      type: String,
      required: true,
      unique: true
    }
  },
  { timestamps: true }
);

rolesSchema.add(permissionsSchema);

export default model('Role', rolesSchema);
