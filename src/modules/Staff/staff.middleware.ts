import { Request, Response } from 'express';
import Constants from '../../config/constants';
import Log from '../../helpers/logger';
import staffModule from './staff.module';
import bcrypt from 'bcryptjs';
import Jwt from '../../helpers/jwt';

export class StaffMiddleware {
  private logger = Log.getLogger();

  public requireAuth = async (req: Request, res: Response, next: () => void) => {
    const token = req.cookies.jwt;
    // check jwt exists and is verified
    if (token) {
      const isVerified = Jwt.decodeAuthToken(token);
      if (!isVerified) {
        return res.status(Constants.UNAUTHORIZED_CODE).json({ error: 'Unauthorized Access', code: Constants.UNAUTHORIZED_CODE });
      } else {
        next();
      }
    } else {
      this.logger.error('Unauthorized Access');
      return res.status(Constants.UNAUTHORIZED_CODE).json({ error: 'Unauthorized Access', code: Constants.UNAUTHORIZED_CODE });
    }
  };

  public checkCredentials = async (req: Request, res: Response, next: () => void) => {
    // get staff detail by email address
    const staff: any = await staffModule.checkStaffEmailExists(req.body.email, res);
    if (staff) {
      if (staff.id && (await bcrypt.compare(req.body.password, staff.password))) {
        req.body._authentication = staff;
        next();
      } else {
        this.logger.error('Invalid Credentials');
        return res.status(Constants.UNAUTHORIZED_CODE).json({ error: 'Invalid Credentials', code: Constants.UNAUTHORIZED_CODE });
      }
    } else {
      res.status(Constants.UNAUTHORIZED_CODE).json({ error: 'Invalid Credentials', code: Constants.UNAUTHORIZED_CODE });
    }
  };
}
