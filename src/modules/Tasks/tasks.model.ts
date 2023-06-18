import { Schema, model } from 'mongoose';

const tasksSchema: Schema = new Schema(
  {
    public: Boolean,
    billable: Boolean,
    subject: String,
    hourlyRate: Number,
    startDate: String,
    dueDate: String,
    fileUrl: String,
    priority: String,
    repeatEvery: String,
    customRepeatDuration: {
      number: {
        type: Number,
        default: 0
      },
      duration: {
        type: String,
        default: ''
      }
    },
    totalCycles: String,
    relatedTo: String,
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'Customer'
    },
    assignees: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Staff'
      }
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Staff'
      }
    ],
    tags: [{ type: String }],
    taskDescription: String
  },
  { timestamps: true }
);

export default model('Task', tasksSchema);
