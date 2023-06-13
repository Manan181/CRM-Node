import { NextFunction } from 'express';
import rolesModel from '../models/Roles/roles.model';
import staffModel from '../models/Staff/staff.model';

export default class StaffRolesMiddleware {
  public static hasPermissions(permission: string) {
    return async (req, res, next: NextFunction) => {
      try {
        const staff = await staffModel.findById(req.body.user.id);
        const keys = permission.split('.');
        const role = await rolesModel.findById(staff.role);
        if (keys[0] in role.permissions && keys[1] in role.permissions[keys[0]]) {
          if (staff.isAdministrator || role.permissions[keys[0]][keys[1]]) next();
          else return res.status(403).json({ status: 'Fail', statusCode: 403, message: 'Forbidden Request' }).end();
        } else return res.status(404).json({ status: 'Fail', statusCode: 404, message: 'Permission not Found' }).end();
      } catch (e) {
        return next(e);
      }
    };
  }
}
