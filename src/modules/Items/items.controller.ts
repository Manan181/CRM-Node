import itemsModule from './items.module';
import Log from '../../helpers/logger';
import { errResponse } from '../../helpers/utils';

class CustomerController {
  private static logger: any = Log.getLogger();

  public static createItem = async (req, res) => {
    try {
      if (!req.body) {
        this.logger.error('Bad Request!');
        return errResponse(404, 'Bad Request!');
      }
      const result = await itemsModule.createItem(req);
      return res.status(200).send(result).end();
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, error.message);
    }
  };

  public static readAllItems = async (req, res) => {
    try {
      const result = await itemsModule.readAllItems();
      return res.status(200).send(result).end();
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, error.message);
    }
  };

  public static updateItem = async (req, res) => {
    try {
      if (!req.params || !req.body) {
        this.logger.error('Bad request!');
        return errResponse(404, 'Bad Request!');
      }
      const result = await itemsModule.updateItem(req);
      return res.status(200).send(result).end();
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, error.message);
    }
  };

  public static deleteItem = async (req, res) => {
    try {
      if (!req.params) {
        this.logger.error('Bad request!');
        return errResponse(404, 'Bad Request!');
      }
      const result = await itemsModule.deleteItem(req);
      return res.status(200).send(result).end();
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, error.message);
    }
  };
}

export default CustomerController;
