import invoiceModule from './invoices.module';
import Log from '../../../helpers/logger';
import { errResponse } from '../../../helpers/utils';
import { isEmpty } from 'lodash';

class ContactsController {
  private static logger: any = Log.getLogger();

  public static createInvoice = async (req, res) => {
    try {
      if (isEmpty(req.body)) {
        this.logger.error('Bad Request!');
        return errResponse(404, 'Bad Request!', res);
      }
      await invoiceModule.createInvoice(req, res);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static readInvoice = async (req, res) => {
    try {
      if (isEmpty(req.body)) {
        this.logger.error('Bad request!');
        return errResponse(404, 'Bad Request!', res);
      }
      await invoiceModule.readInvoice(req, res);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static readAllInvoices = async (req, res) => {
    try {
      await invoiceModule.readAllInvoices(res);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static updateInvoice = async (req, res) => {
    try {
      if (isEmpty(req.params) || isEmpty(req.body)) {
        this.logger.error('Bad Request!');
        return errResponse(404, 'Bad Request!', res);
      }
      await invoiceModule.updateInvoice(req, res);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static deleteInvoice = async (req, res) => {
    try {
      await invoiceModule.deleteInvoice(req, res);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };
}

export default ContactsController;
