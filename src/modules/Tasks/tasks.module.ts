import Task from './tasks.model';
import { Request, Response } from 'express';
import Log from '../../helpers/logger';
import { sucResponse, errResponse } from '../../helpers/utils';

class tasksModule {
  private static logger = Log.getLogger();

  public static createTask = async (req: Request, res: Response) => {
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
      return sucResponse('Task Saved', res, savedTask);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static readAllTasks = async (res: Response) => {
    try {
      const tasks = await Task.find();
      if (tasks.length > 0) {
        return sucResponse(`Found ${tasks.length} tasks`, res, tasks);
      } else {
        this.logger.error('No Tasks Found!');
        return errResponse(404, 'No Tasks Found!', res);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static updateTask = async (req: Request, res: Response) => {
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
        return sucResponse('Updated Task!', res, task);
      } else {
        this.logger.error('Task Not Found!');
        return errResponse(404, 'Task Not Found!', res);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static deleteTask = async (req: Request, res: Response) => {
    try {
      const taskId = req.params.id;
      const task = await Task.findByIdAndDelete(taskId);
      if (!task) {
        this.logger.error('Task not found!');
        return errResponse(404, 'Task Not Found!', res, task);
      } else {
        return sucResponse('Task Deleted!', res, task);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };
}

export default tasksModule;
