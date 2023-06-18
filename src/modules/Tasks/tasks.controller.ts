import tasksModule from './tasks.module';
import Log from '../../helpers/logger';
import { errResponse } from '../../helpers/utils';

class TasksController {
  private static logger: any = Log.getLogger();

  public static createTask = async (req, res) => {
    try {
      if (!req.body) {
        this.logger.error('Bad Request!');
        return errResponse(404, 'Bad Request!');
      }
      const result = await tasksModule.createTask(req);
      return res.status(200).send(result).end();
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, error.message);
    }
  };

  public static readAllTasks = async (req, res) => {
    try {
      const result = await tasksModule.readAllTasks();
      return res.status(200).send(result).end();
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, error.message);
    }
  };

  public static updateTask = async (req, res) => {
    try {
      if (!req.params || !req.body) {
        this.logger.error('Bad request!');
        return errResponse(404, 'Bad Request!');
      }
      const result = await tasksModule.updateTask(req);
      return res.status(200).send(result).end();
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, error.message);
    }
  };

  public static deleteTask = async (req, res) => {
    try {
      if (!req.params) {
        this.logger.error('Bad request!');
        return errResponse(404, 'Bad Request!');
      }
      const result = await tasksModule.deleteTask(req);
      return res.status(200).send(result).end();
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, error.message);
    }
  };
}

export default TasksController;
