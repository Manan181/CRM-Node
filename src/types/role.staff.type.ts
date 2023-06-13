import { Document, Schema } from 'mongoose';
import Permissions from './permissions.staff.type';

interface StaffRole extends Document {
  id: Schema.Types.ObjectId;
  roleName: string;
  permissions: Permissions;
}
export default StaffRole;
