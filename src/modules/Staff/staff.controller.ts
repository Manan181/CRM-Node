import staffModule from './staff.module';
import Log from '../../helpers/logger';
import { errResponse } from '../../helpers/utils';
import { isEmpty } from 'lodash';

class StaffController {
  private static logger: any = Log.getLogger();

  public static createStaff = async (req, res) => {
    try {
      if (isEmpty(req.body)) {
        this.logger.error('Bad Request!');
        return errResponse(404, 'Bad Request!', res);
      }
      await staffModule.createStaff(req, res);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static readStaff = async (req, res) => {
    try {
      if (isEmpty(req.params)) {
        this.logger.error('Bad Request!');
        return errResponse(404, 'Bad Request!', res);
      }
      await staffModule.readStaff(req, res);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static readAllStaff = async (req, res) => {
    try {
      await staffModule.readAllStaff(res);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static updateStaff = async (req, res) => {
    try {
      if (isEmpty(req.params)) {
        this.logger.error('Bad request');
        return errResponse(404, 'Bad Request', res);
      }
      await staffModule.updateStaff(req, res);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static deleteStaff = async (req, res) => {
    try {
      if (isEmpty(req.params)) {
        this.logger.error('Bad Request!');
        return errResponse(404, 'Bad Request!', res);
      }
      await staffModule.deleteStaff(req, res);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static loginAdmin = async (req, res) => {
    try {
      if (isEmpty(req.body)) {
        this.logger.error('Bad Request!');
        return errResponse(404, 'Bad Request!', res);
      }
      await staffModule.loginStaff(req, res);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };
}

export default StaffController;
