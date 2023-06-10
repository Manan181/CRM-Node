import staffModule from './staff.module';
import Log from '../../helpers/logger';
import { errResponse } from '../../helpers/utils';

class StaffController {
  private static logger: any = Log.getLogger();

  public static createStaff = async (req, res) => {
    try {
      const result = await staffModule.createStaff(req);
      return res.status(200).send(result).end();
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, error.message);
    }
  };

  public static readStaff = async (req, res) => {
    try {
      const result = await staffModule.readStaff(req);
      return res.status(200).send(result).end();
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, error.message);
    }
  };

  public static readAllStaff = async (req, res) => {
    try {
      const result = await staffModule.readAllStaff();
      return res.status(200).send(result).end();
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, error.message);
    }
  };

  public static updateStaff = async (req, res) => {
    try {
      const result = await staffModule.updateStaff(req);
      return res.status(200).send(result).end();
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, error.message);
    }
  };

  public static deleteStaff = async (req, res) => {
    try {
      const result = await staffModule.deleteStaff(req);
      return res.status(200).send(result).end();
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, error.message);
    }
  };
}

export default StaffController;
