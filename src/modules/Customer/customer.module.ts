import Customer from './customer.model';
import { Request } from 'express';
import mongoose from 'mongoose';
import Log from '../../helpers/logger';
import { validateCustomerData } from '../../helpers/validations';
import { sucResponse, errResponse } from '../../helpers/utils';

class customerModule {
  private static logger: any = Log.getLogger();

  public static createCustomer = async (req: Request) => {
    try {
      if (!req.body) {
        this.logger.error(404, 'Bad Request!');
        return errResponse(404, 'Bad Request!');
      }

      const { error } = validateCustomerData(req.body);
      if (error) {
        this.logger.error(400, 'Bad Request!', error);
        return errResponse(400, 'Bad Request!', error);
      }

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
      return sucResponse(200, 'Customer Saved', savedCustomer);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };

  public static readCustomer = async (req: Request) => {
    try {
      if (!req.body) {
        this.logger.error(404, 'Bad request!');
        return errResponse(404, 'Bad Request!');
      }
      const customerId = req.params.customerId;
      const customer = await Customer.findById(customerId);
      if (!customer) {
        this.logger.error('Customer not found!');
        return errResponse(404, 'Customer Not Found!', customer);
      } else {
        this.logger.info('Customer Found!', customer);
        return sucResponse(200, 'Found Customer!', customer);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };

  public static readAllCustomer = async () => {
    try {
      const customers = await Customer.find();
      return sucResponse(200, `Found ${customers.length} customers`, customers);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };

  public static updateCustomer = async (req: Request) => {
    try {
      if (!req.params) {
        this.logger.error(404, 'Bad request!');
        return errResponse(404, 'Bad Request!');
      }
      const customerId = req.params.customerId;
      const customer = await Customer.findById(customerId);
      if (customer) {
        customer.set(req.body);
        await customer.save();
        return sucResponse(201, 'Updated Customer!', customer);
      } else {
        this.logger.error('Customer Not Found!');
        return errResponse(404, 'Customer Not Found!');
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };

  public static deleteCustomer = async (req: Request) => {
    try {
      if (!req.params) {
        this.logger.error(404, 'Bad request!');
        return errResponse(404, 'Bad Request!');
      }
      const customerId = req.params.customerId;
      const customer = await Customer.findByIdAndDelete(customerId);
      if (!customer) {
        this.logger.error('Customer not found!');
        return errResponse(404, 'Customer Not Found!', customer);
      } else {
        return sucResponse(200, 'Customer Deleted!', customer);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };
}

export default customerModule;
