import Customer from './customer.model';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Log from '../../helpers/logger';
import { sucResponse, errResponse } from '../../helpers/utils';

class customerModule {
  private static logger: any = Log.getLogger();

  public static createCustomer = async (req: Request, res: Response) => {
    try {
      const customer = new Customer({
        _id: new mongoose.Types.ObjectId(),
        company: req.body.company,
        vatNumber: req.body.vatNumber,
        phone: req.body.phone,
        website: req.body.website,
        groups: req.body.groups,
        currency: req.body.currency,
        defaultLanguage: req.body.defaultLanguage,
        customerAddress: req.body.customerAddress,
        billingAddress: req.body.billingAddress,
        shippingAddress: req.body.shippingAddress
      });
      const savedCustomer = await customer.save();
      return sucResponse('Customer Saved', res, savedCustomer);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static readCustomer = async (req: Request, res: Response) => {
    try {
      const customerId = req.params.id;
      const customer = await Customer.findById(customerId);
      if (!customer) {
        this.logger.error('Customer not found!');
        return errResponse(404, 'Customer Not Found!', res);
      } else {
        this.logger.info('Customer Found!', customer);
        return sucResponse('Found Customer!', res, customer);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static readAllCustomer = async (res: Response) => {
    try {
      const customers = await Customer.find();
      if (customers.length > 0) {
        return sucResponse(`Found ${customers.length} customers`, res, customers);
      } else {
        this.logger.error('No Customers Found!');
        return errResponse(404, 'No Customers Found!', res);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static updateCustomer = async (req: Request, res: Response) => {
    try {
      const customerId = req.params.id;
      const customer = await Customer.findById(customerId);
      if (customer) {
        customer.set(req.body);
        await customer.save();
        return sucResponse('Updated Customer!', res, customer);
      } else {
        this.logger.error('Customer Not Found!');
        return errResponse(404, 'Customer Not Found!', res);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static deleteCustomer = async (req: Request, res: Response) => {
    try {
      const customerId = req.params.id;
      const customer = await Customer.findByIdAndDelete(customerId);
      if (!customer) {
        this.logger.error('Customer not found!');
        return errResponse(404, 'Customer Not Found!', res);
      } else {
        return sucResponse('Customer Deleted!', res, customer);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };
}

export default customerModule;
