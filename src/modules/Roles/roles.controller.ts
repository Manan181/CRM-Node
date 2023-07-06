import rolesModule from './roles.module';
import Log from '../../helpers/logger';
import { errResponse } from '../../helpers/utils';
import { isEmpty } from 'lodash';

class RolesController {
  private static logger: any = Log.getLogger();

  public static createRole = async (req, res) => {
    try {
      if (isEmpty(req.body)) {
        this.logger.error('Bad request');
        return errResponse(404, 'Bad Request', res);
      }
      await rolesModule.createRole(req, res);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static readRole = async (req, res) => {
    try {
      if (isEmpty(req.params)) {
        this.logger.error('Bad request');
        return errResponse(404, 'Bad Request', res);
      }
      await rolesModule.readRole(req, res);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static readAllRoles = async (req, res) => {
    try {
      await rolesModule.readAllRoles(res);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static updateRole = async (req, res) => {
    try {
      if (isEmpty(req.params) || isEmpty(req.body)) {
        this.logger.error('Bad request');
        return errResponse(404, 'Bad Request', res);
      }
      await rolesModule.updateRole(req, res);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static deleteRole = async (req, res) => {
    try {
      if (isEmpty(req.params)) {
        this.logger.error('Bad Request!');
        return errResponse(404, 'Bad Request!', res);
      }
      await rolesModule.deleteRole(req, res);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };
}

export default RolesController;
