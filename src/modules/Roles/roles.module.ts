import Roles from '../../models/Roles/roles.model';
import { Request } from 'express';
import { Log } from '../../helpers/logger';
import { sucResponse, errResponse } from '../../helpers/utils';

export class rolesModule {
  private static logger: any = Log.getLogger();

  public static createRole = async (req: Request) => {
    try {
      if (!req.body) {
        this.logger.error(404, 'Bad request');
        return errResponse(404, 'Bad Request');
      }
      const role = new Roles({
        roleName: req.body.roleName,
        permissions: req.body.permissions
      });
      const savedRole = await role.save();
      return sucResponse(200, 'Role Saved', savedRole);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };

  public static readRole = async (req: Request) => {
    try {
      if (!req.body) {
        this.logger.error(404, 'Bad request');
        return errResponse(404, 'Bad Request');
      }
      const roleId = req.params.roleId;
      const role = await Roles.findById(roleId);
      if (!role) {
        this.logger.error('Role not found');
        return errResponse(404, 'Role Not Found!', role);
      } else {
        this.logger.info('Role Found!', role);
        return sucResponse(200, 'Found Role!', role);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };

  public static readAllRoles = async () => {
    try {
      const roles = await Roles.find();
      return sucResponse(200, `Found ${roles.length} Roles`, roles);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };

  public static updateRole = async (req: Request) => {
    try {
      if (!req.params) {
        this.logger.error(404, 'Bad request');
        return errResponse(404, 'Bad Request');
      }
      const roleId = req.params.roleId;
      const role = await Roles.findById(roleId);
      if (role) {
        role.set(req.body);
        await role.save();
        return sucResponse(201, 'Updated Role', role);
      } else {
        this.logger.error('Role Not Found');
        return errResponse(404, 'Role Not Found!');
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };

  public static deleteRole = async (req: Request) => {
    try {
      if (!req.params) {
        this.logger.error(404, 'Bad Request!');
        return errResponse(404, 'Bad Request!');
      }
      const roleId = req.params.roleId;
      const role = await Roles.findByIdAndDelete(roleId);
      if (!role) {
        this.logger.error('Role member not found!');
        return errResponse(404, 'Role Member Not Found!', role);
      } else {
        return sucResponse(200, 'Role Member Deleted!', role);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };
}

export default rolesModule;
