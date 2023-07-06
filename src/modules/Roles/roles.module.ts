import Roles from './roles.model';
import { Request, Response } from 'express';
import Log from '../../helpers/logger';
import { sucResponse, errResponse } from '../../helpers/utils';

class rolesModule {
  private static logger: any = Log.getLogger();

  public static createRole = async (req: Request, res: Response) => {
    try {
      const role = new Roles({
        roleName: req.body.roleName,
        permissions: req.body.permissions
      });
      const savedRole = await role.save();
      return sucResponse('Role Saved', res, savedRole);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static readRole = async (req: Request, res: Response) => {
    try {
      const roleId = req.params.id;
      const role = await Roles.findById(roleId);
      if (!role) {
        this.logger.error('Role not found');
        return errResponse(404, 'Role Not Found!', res, role);
      } else {
        this.logger.info('Role Found!', role);
        return sucResponse('Found Role!', res, role);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static readAllRoles = async (res: Response) => {
    try {
      const roles = await Roles.find();
      return sucResponse(`Found ${roles.length} Roles`, res, roles);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static updateRole = async (req: Request, res: Response) => {
    try {
      const roleId = req.params.id;
      const role = await Roles.findById(roleId);
      if (role) {
        role.set(req.body);
        await role.save();
        return sucResponse('Updated Role', res, role);
      } else {
        this.logger.error('Role Not Found');
        return errResponse(404, 'Role Not Found!', res);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static deleteRole = async (req: Request, res: Response) => {
    try {
      const roleId = req.params.id;
      const role = await Roles.findByIdAndDelete(roleId);
      if (!role) {
        this.logger.error('Role member not found!');
        return errResponse(404, 'Role Member Not Found!', res, role);
      } else {
        return sucResponse('Role Member Deleted!', res, role);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };
}

export default rolesModule;
