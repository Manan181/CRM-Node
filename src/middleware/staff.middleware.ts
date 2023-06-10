// import { Jwt } from '../helpers/jwt';
// import Staff from '../models/Staff/staff.model';
// import { config } from '../config/config';
import Log from '../helpers/logger';

class staffMiddleware {
  private static logger: any = Log.getLogger();

  public static auth = async (req, res, next) => {
    try {
      const token = req.cookies.jwt;
      // const verifyUser = Jwt.decodeAuthToken(token);
      // const staff = await Staff.findOne({
      //   _id: verifyUser._id
      // });
      req.token = token;
      // req.staff = staff;
      next();
    } catch (error) {
      this.logger.error(error);
      res.status(401).send(error);
    }
  };
}

export default staffMiddleware;
