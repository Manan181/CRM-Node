import Task from './tasks.model';
import { Request } from 'express';
import Log from '../../helpers/logger';
import { sucResponse, errResponse } from '../../helpers/utils';

class tasksModule {
  private static logger = Log.getLogger();

  public static createTask = async (req: Request) => {
    try {
      const task = new Task({
        public: req.body.public,
        billable: req.body.billable,
        subject: req.body.subject,
        hourlyRate: req.body.hourlyRate,
        startDate: req.body.startDate,
        dueDate: req.body.dueDate,
        fileUrl: req.body.fileUrl,
        priority: req.body.priority,
        repeatEvery: req.body.repeatEvery,
        customRepeatDuration: req.body.customRepeatDuration,
        totalCycles: req.body.totalCycles,
        relatedTo: req.body.relatedTo,
        customerId: req.body.customerId,
        assignees: req.body.assignees,
        followers: req.body.followers,
        tags: req.body.tags,
        taskDescription: req.body.taskDescription
      });
      const savedTask = await task.save();
      return sucResponse(200, 'Task Saved', savedTask);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };

  public static readAllTasks = async () => {
    try {
      const tasks = await Task.find();
      if (tasks.length > 0) {
        return sucResponse(200, `Found ${tasks.length} tasks`, tasks);
      } else {
        this.logger.error('No Tasks Found!');
        return errResponse(404, 'No Tasks Found!');
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };

  public static updateTask = async (req: Request) => {
    try {
      const update = {
        public: req.body.public,
        billable: req.body.billable,
        subject: req.body.subject,
        hourlyRate: req.body.hourlyRate,
        startDate: req.body.startDate,
        dueDate: req.body.dueDate,
        priority: req.body.priority,
        repeatEvery: req.body.repeatEvery,
        relatedTo: req.body.relatedTo,
        tags: req.body.tags,
        taskDescription: req.body.taskDescription
      };
      const task = await Task.updateOne({ _id: req.params.id }, { $set: update }, { upsert: true });
      if (task) {
        this.logger.info('Task Updated Successfully!');
        return sucResponse(201, 'Updated Task!', task);
      } else {
        this.logger.error('Task Not Found!');
        return errResponse(404, 'Task Not Found!');
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };

  public static deleteTask = async (req: Request) => {
    try {
      const taskId = req.params.id;
      const task = await Task.findByIdAndDelete(taskId);
      if (!task) {
        this.logger.error('Task not found!');
        return errResponse(404, 'Task Not Found!', task);
      } else {
        return sucResponse(200, 'Task Deleted!', task);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };
}

export default tasksModule;
