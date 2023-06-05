import customerModule from '../../modules/Customer/customer.module';
import { Log } from '../../helpers/logger';
import { errResponse } from '../../helpers/utils';

export class CustomerController {
  private static logger: any = Log.getLogger();

  public static createCustomer = async (req, res) => {
    try {
      const result = await customerModule.createCustomer(req);
      return res.status(200).send(result).end();
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, error.message);
    }
  };

  public static readCustomer = async (req, res) => {
    try {
      const result = await customerModule.readCustomer(req);
      return res.status(200).send(result).end();
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, error.message);
    }
  };

  public static readAllCustomer = async (req, res) => {
    try {
      const result = await customerModule.readAllCustomer();
      return res.status(200).send(result).end();
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, error.message);
    }
  };

  public static updateCustomer = async (req, res) => {
    try {
      const result = await customerModule.updateCustomer(req);
      return res.status(200).send(result).end();
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, error.message);
    }
  };

  public static deleteCustomer = async (req, res) => {
    try {
      const result = await customerModule.deleteCustomer(req);
      return res.status(200).send(result).end();
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, error.message);
    }
  };
}
