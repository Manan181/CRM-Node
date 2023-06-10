import rolesModule from './roles.module';
import Log from '../../helpers/logger';
import { errResponse } from '../../helpers/utils';

class RolesController {
  private static logger: any = Log.getLogger();

  public static createRole = async (req, res) => {
    try {
      const result = await rolesModule.createRole(req);
      return res.status(200).send(result).end();
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, error.message);
    }
  };

  public static readRole = async (req, res) => {
    try {
      const result = await rolesModule.readRole(req);
      return res.status(200).send(result).end();
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, error.message);
    }
  };

  public static readAllRoles = async (req, res) => {
    try {
      const result = await rolesModule.readAllRoles();
      return res.status(200).send(result).end();
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, error.message);
    }
  };

  public static updateRole = async (req, res) => {
    try {
      const result = await rolesModule.updateRole(req);
      return res.status(200).send(result).end();
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, error.message);
    }
  };

  public static deleteRole = async (req, res) => {
    try {
      const result = await rolesModule.deleteRole(req);
      return res.status(200).send(result).end();
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, error.message);
    }
  };
}

export default RolesController;
