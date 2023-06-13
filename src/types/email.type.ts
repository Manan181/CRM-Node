import { Document } from 'mongoose';

interface EmailNotifications extends Document {
  invoice?: boolean;
  estimate?: boolean;
  contract?: boolean;
  creditNote?: boolean;
  tickets?: boolean;
  project?: boolean;
  task?: boolean;
}

export default EmailNotifications;
