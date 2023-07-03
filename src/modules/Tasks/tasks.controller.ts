import tasksModule from './tasks.module';
import Log from '../../helpers/logger';
import { errResponse, sucResponse } from '../../helpers/utils';
import { isEmpty } from 'lodash';

class TasksController {
  private static logger: any = Log.getLogger();

  public static createTask = async (req, res) => {
    try {
      if (isEmpty(req.body)) {
        this.logger.error('Bad Request!');
        return errResponse(404, 'Bad Request!', res);
      }
      const result = await tasksModule.createTask(req, res);
      return sucResponse('Success', res, result);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static readAllTasks = async (req, res) => {
    try {
      const result = await tasksModule.readAllTasks(res);
      return sucResponse('Success', res, result);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static updateTask = async (req, res) => {
    try {
      if (isEmpty(req.params) || isEmpty(req.body)) {
        this.logger.error('Bad request!');
        return errResponse(404, 'Bad Request!', res);
      }
      const result = await tasksModule.updateTask(req, res);
      return sucResponse('Success', res, result);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static deleteTask = async (req, res) => {
    try {
      if (isEmpty(req.params)) {
        this.logger.error('Bad request!');
        return errResponse(404, 'Bad Request!', res);
      }
      const result = await tasksModule.deleteTask(req, res);
      return sucResponse('Success', res, result);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };
}

export default TasksController;
