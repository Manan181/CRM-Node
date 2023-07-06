import itemsModule from './items.module';
import Log from '../../helpers/logger';
import { errResponse } from '../../helpers/utils';
import { isEmpty } from 'lodash';

class CustomerController {
  private static logger: any = Log.getLogger();

  public static createItem = async (req, res) => {
    try {
      if (isEmpty(req.body)) {
        this.logger.error('Bad Request!');
        return errResponse(404, 'Bad Request!', res);
      }
      await itemsModule.createItem(req, res);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static readAllItems = async (req, res) => {
    try {
      await itemsModule.readAllItems(res);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static updateItem = async (req, res) => {
    try {
      if (isEmpty(req.params) || isEmpty(req.body)) {
        this.logger.error('Bad request!');
        return errResponse(404, 'Bad Request!', res);
      }
      await itemsModule.updateItem(req, res);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static deleteItem = async (req, res) => {
    try {
      if (isEmpty(req.params)) {
        this.logger.error('Bad request!');
        return errResponse(404, 'Bad Request!', res);
      }
      await itemsModule.deleteItem(req, res);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };
}

export default CustomerController;
