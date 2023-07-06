import tasksModule from './tasks.module';
import Log from '../../helpers/logger';
import { errResponse } from '../../helpers/utils';
import { isEmpty } from 'lodash';

class TasksController {
  private static logger: any = Log.getLogger();

  public static createTask = async (req, res) => {
    try {
      if (isEmpty(req.body)) {
        this.logger.error('Bad Request!');
        return errResponse(404, 'Bad Request!', res);
      }
      await tasksModule.createTask(req, res);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static readAllTasks = async (req, res) => {
    try {
      await tasksModule.readAllTasks(res);
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
      await tasksModule.updateTask(req, res);
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
      await tasksModule.deleteTask(req, res);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };
}

export default TasksController;
