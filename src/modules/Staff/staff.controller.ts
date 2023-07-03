import staffModule from './staff.module';
import Log from '../../helpers/logger';
import { errResponse, sucResponse } from '../../helpers/utils';
import { isEmpty } from 'lodash';

class StaffController {
  private static logger: any = Log.getLogger();

  public static createStaff = async (req, res) => {
    try {
      if (isEmpty(req.body)) {
        this.logger.error('Bad Request!');
        return errResponse(404, 'Bad Request!', res);
      }
      const result = await staffModule.createStaff(req, res);
      return sucResponse('Success', res, result);
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
      const result = await staffModule.readStaff(req, res);
      return sucResponse('Success', res, result);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static readAllStaff = async (req, res) => {
    try {
      const result = await staffModule.readAllStaff(res);
      return sucResponse('Success', res, result);
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
      const result = await staffModule.updateStaff(req, res);
      return sucResponse('Success', res, result);
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
      const result = await staffModule.deleteStaff(req, res);
      return sucResponse('Success', res, result);
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
      const result = await staffModule.loginStaff(req, res);
      return sucResponse('Success', res, result);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };
}

export default StaffController;
