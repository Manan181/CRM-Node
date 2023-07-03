import invoiceModule from './invoices.module';
import Log from '../../../helpers/logger';
import { errResponse, sucResponse } from '../../../helpers/utils';
import { isEmpty } from 'lodash';

class ContactsController {
  private static logger: any = Log.getLogger();

  public static createInvoice = async (req, res) => {
    try {
      if (isEmpty(req.body)) {
        this.logger.error('Bad Request!');
        return errResponse(404, 'Bad Request!', res);
      }
      const result = await invoiceModule.createInvoice(req, res);
      return sucResponse('Success', res, result);
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
      const result = await invoiceModule.readInvoice(req, res);
      return sucResponse('Success', res, result);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static readAllInvoices = async (req, res) => {
    try {
      const result = await invoiceModule.readAllInvoices(res);
      return sucResponse('Success', res, result);
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
      const result = await invoiceModule.updateInvoice(req, res);
      return sucResponse('Success', res, result);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static deleteInvoice = async (req, res) => {
    try {
      const result = await invoiceModule.deleteInvoice(req, res);
      return sucResponse('Success', res, result);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };
}

export default ContactsController;
