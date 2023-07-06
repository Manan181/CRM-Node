import { NextFunction } from 'express';
import rolesModel from '../Roles/roles.model';
import staffModel from './staff.model';
import { errResponse } from '../../helpers/utils';

export default class StaffRolesMiddleware {
  public static hasPermissions(permission: string) {
    return async (req, res, next: NextFunction) => {
      try {
        const staff = await staffModel.findById(req.body.user.id);
        const keys = permission.split('.');
        const role = await rolesModel.findById(staff.role);
        if (keys[0] in role.permissions && keys[1] in role.permissions[keys[0]]) {
          if (staff.isAdministrator || role.permissions[keys[0]][keys[1]]) next();
          else return errResponse(403, 'Forbidden Request', res);
        } else return errResponse(404, 'Permission not Found', res);
      } catch (e) {
        return next(e);
      }
    };
  }
}
