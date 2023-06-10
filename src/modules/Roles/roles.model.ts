import { Schema, model } from 'mongoose';
import Permissions from '../permissions.model';

const permissionsSchema = {
  permissions: Permissions
};

const rolesSchema: Schema = new Schema(
  {
    role: {
      rodeId: {
        type: Schema.Types.ObjectId,
        required: true
      },
      roleName: {
        type: String,
        required: true
      }
    }
  },
  { timestamps: true }
);

rolesSchema.add(permissionsSchema);

export default model('Role', rolesSchema);
