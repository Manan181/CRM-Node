import Invoice from './invoices.model';
import { Request, Response } from 'express';
import Log from '../../../helpers/logger';
import { sucResponse, errResponse } from '../../../helpers/utils';
import { isEmpty } from 'lodash';
// import config from '../../config/config';

class invoicesModule {
  private static logger: any = Log.getLogger();

  // create a new invoice
  public static createInvoice = async (req: Request, res: Response) => {
    try {
      const invoice = new Invoice({
        customerId: req.body.customerId,
        billTo: req.body.billTo,
        shipTo: req.body.shipTo,
        invoiceNumber: req.body.invoiceNumber,
        invoiceDate: req.body.invoiceDate,
        dueDate: req.body.dueDate,
        preventSendingOverdueReminders: req.body.preventSendingOverdueReminders,
        tags: req.body.tags,
        paymentModes: req.body.paymentModes,
        currency: req.body.currency,
        saleAgent: req.body.saleAgent,
        recurringInvoice: req.body.recurringInvoice,
        customRecurringDuration: req.body.customRecurringDuration,
        discountType: req.body.discountType,
        totalCycles: req.body.totalCycles,
        adminNote: req.body.adminNote,
        items: req.body.items
      });
      const savedInvoice = await invoice.save();
      return sucResponse('Contact Saved!', res, savedInvoice);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  // get all contacts
  public static getAllInvoices = async (res: Response) => {
    try {
      const invoices = await Invoice.find();
      if (invoices.length > 0) {
        return sucResponse(`${invoices.length} Invoices Found!`, res, invoices);
      } else {
        return errResponse(404, 'No Invoices Found!', res);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  // read a contact
  public static readInvoice = async (req: Request, res: Response) => {
    try {
      const invoiceId = req.params.id;
      const invoice = await Invoice.findById(invoiceId);
      if (!invoice) {
        this.logger.error('Invoice not found!');
        return errResponse(404, 'Invoice Not Found!', res);
      } else {
        this.logger.info('Invoice Found!', invoice);
        return sucResponse('Found Invoice!', res, invoice);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  // read all contacts
  public static readAllInvoices = async (res: Response) => {
    try {
      const invoices = await Invoice.find();
      if (invoices.length > 0) {
        return sucResponse(`Found ${invoices.length} Invoices`, res, invoices);
      } else {
        return errResponse(404, 'No Invoices Found!', res);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  // update a invoice
  public static updateInvoice = async (req: Request, res: Response) => {
    try {
      const invoiceId = req.params.id;
      const invoice = await Invoice.findById(invoiceId);
      if (invoice) {
        invoice.set(req.body);
        await invoice.save();
        return sucResponse('Updated Invoice!', res, invoice);
      } else {
        this.logger.error('Invoice Not Found!');
        return errResponse(404, 'Invoice Not Found!', res);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  // delete a invoice
  public static deleteInvoice = async (req: Request, res: Response) => {
    try {
      if (isEmpty(req.params)) {
        this.logger.error('Bad request!');
        return errResponse(404, 'Bad Request!', res);
      }
      const invoiceId = req.params.id;
      const invoice = await Invoice.findByIdAndDelete(invoiceId);
      if (!invoice) {
        this.logger.error('Invoice not found!');
        return errResponse(404, 'Invoice Not Found!', res, invoice);
      } else {
        return sucResponse('Invoice Deleted!', res, invoice);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };
}

export default invoicesModule;
