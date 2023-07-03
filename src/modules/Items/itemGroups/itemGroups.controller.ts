import itemGroupModule from './itemGroups.module';
import Log from '../../../helpers/logger';
import { errResponse, sucResponse } from '../../../helpers/utils';
import { isEmpty } from 'lodash';

class ItemGroupController {
  private static logger: any = Log.getLogger();

  public static createItemGroup = async (req, res) => {
    try {
      if (isEmpty(req.body)) {
        this.logger.error('Bad Request!');
        return errResponse(404, 'Bad Request!', res);
      }
      const result = await itemGroupModule.createItemGroup(req, res);
      return sucResponse('Success', res, result);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static readAllItemGroups = async (req, res) => {
    try {
      const result = await itemGroupModule.readAllItemGroups(res);
      return sucResponse('Success', res, result);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static updateItemGroup = async (req, res) => {
    try {
      if (isEmpty(req.params)) {
        this.logger.error('Bad request!');
        return errResponse(404, 'Bad Request!', res);
      }
      const result = await itemGroupModule.updateItemGroup(req, res);
      return sucResponse('Success', res, result);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static deleteItemGroup = async (req, res) => {
    try {
      if (isEmpty(req.params)) {
        this.logger.error('Bad request!');
        return errResponse(404, 'Bad Request!', res);
      }
      const result = await itemGroupModule.deleteItemGroup(req, res);
      return sucResponse('Success', res, result);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };
}

export default ItemGroupController;
