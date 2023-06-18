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
      return sucResponse(200, 'Contact Saved!', savedInvoice);
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
      if (!req.params) {
        this.logger.error(404, 'Bad Request!');
        return errResponse(404, 'Bad Request!');
      }
      const invoiceId = req.params.invoiceId;
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
        this.logger.error(404, 'Bad request!');
        return errResponse(404, 'Bad Request!');
      }
      const invoiceId = req.params.invoiceId;
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
