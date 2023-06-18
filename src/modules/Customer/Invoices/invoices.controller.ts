import invoiceModule from './invoices.module';
import Log from '../../../helpers/logger';
import { errResponse } from '../../../helpers/utils';

class ContactsController {
  private static logger: any = Log.getLogger();

  public static createInvoice = async (req, res) => {
    try {
      if (!req.body) {
        this.logger.error('Bad Request!');
        return errResponse(404, 'Bad Request!');
      }
      const result = await invoiceModule.createInvoice(req);
      return res.status(200).send(result).end();
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, error.message);
    }
  };

  public static readInvoice = async (req, res) => {
    try {
      if (!req.body) {
        this.logger.error('Bad request!');
        return errResponse(404, 'Bad Request!');
      }
      const result = await invoiceModule.readInvoice(req);
      return res.status(200).send(result).end();
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, error.message);
    }
  };

  public static readAllInvoices = async (req, res) => {
    try {
      const result = await invoiceModule.readAllInvoices();
      return res.status(200).send(result).end();
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, error.message);
    }
  };

  public static updateInvoice = async (req, res) => {
    try {
      const result = await invoiceModule.updateInvoice(req);
      return res.status(200).send(result).end();
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, error.message);
    }
  };

  public static deleteInvoice = async (req, res) => {
    try {
      const result = await invoiceModule.deleteInvoice(req);
      return res.status(200).send(result).end();
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, error.message);
    }
  };
}

export default ContactsController;
