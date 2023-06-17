import Invoice from './invoices.model';
import { Request } from 'express';
import Log from '../../../helpers/logger';
import { sucResponse, errResponse } from '../../../helpers/utils';
// import config from '../../config/config';

class invoicesModule {
  private static logger: any = Log.getLogger();

  // create a new invoice
  public static createInvoice = async (req: Request) => {
    try {
      if (!req.body) {
        this.logger.error('Bad Request!');
        return errResponse(404, 'Bad Request!');
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };

  // get all contacts
  public static getAllInvoices = async () => {
    try {
      const invoices = await Invoice.find();
      if (invoices.length > 0) {
        return sucResponse(200, `${invoices.length} Invoices Found!`, invoices);
      } else {
        return errResponse(404, 'No Invoices Found!');
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };

  // read a contact
  public static readInvoice = async (req: Request) => {
    try {
      if (!req.body) {
        this.logger.error('Bad request!');
        return errResponse(404, 'Bad Request!');
      }
      const invoiceId = req.params.id;
      const invoice = await Invoice.findById(invoiceId);
      if (!invoice) {
        this.logger.error('Invoice not found!');
        return errResponse(404, 'Invoice Not Found!', invoice);
      } else {
        this.logger.info('Invoice Found!', invoice);
        return sucResponse(200, 'Found Invoice!', invoice);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };

  // read all contacts
  public static readAllInvoices = async () => {
    try {
      const invoices = await Invoice.find();
      if (invoices.length > 0) {
        return sucResponse(200, `Found ${invoices.length} Invoices`, invoices);
      } else {
        return errResponse(404, 'No Invoices Found!');
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };

  // update a invoice
  public static updateInvoice = async (req: Request) => {
    try {
      const invoiceId = req.params.id;
      const invoice = await Invoice.findById(invoiceId);
      if (invoice) {
        invoice.set(req.body);
        await invoice.save();
        return sucResponse(201, 'Updated Invoice!', invoice);
      } else {
        this.logger.error('Invoice Not Found!');
        return errResponse(404, 'Invoice Not Found!');
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };

  // delete a invoice
  public static deleteInvoice = async (req: Request) => {
    try {
      if (!req.params) {
        this.logger.error('Bad request!');
        return errResponse(404, 'Bad Request!');
      }
      const invoiceId = req.params.id;
      const invoice = await Invoice.findByIdAndDelete(invoiceId);
      if (!invoice) {
        this.logger.error('Invoice not found!');
        return errResponse(404, 'Invoice Not Found!', invoice);
      } else {
        return sucResponse(200, 'Invoice Deleted!', invoice);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };
}

export default invoicesModule;
