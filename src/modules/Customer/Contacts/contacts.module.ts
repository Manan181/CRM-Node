import Contact from './contacts.model';
import { Request, Response } from 'express';
import Log from '../../../helpers/logger';
import { sucResponse, errResponse } from '../../../helpers/utils';
import config from '../../../config/config';

// import bcrypt from 'bcryptjs';

class contactsModule {
  private static logger: any = Log.getLogger();

  // create a new contact
  public static createContact = async (req: Request, res: Response) => {
    try {
      const contact = new Contact({
        customerId: req.body.customerId,
        profileImageUrl: req?.files?.image ? `${config.adminUrl}/${req.body.fileName}` : null,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        position: req.body.position,
        direction: req.body.direction,
        isPrimaryContact: req.body.isPrimaryContact,
        sendWelcomeEmail: req.body.sendWelcomeEmail,
        sendSetPasswordEmail: req.body.sendSetPasswordEmail,
        permissions: req.body.permissions,
        emailNotifications: req.body.emailNotifications,
        password: req.body.password
      });
      const savedContact = await contact.save();
      return sucResponse('Contact Saved!', res, savedContact);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  // get all contacts
  public static readAllContacts = async (res: Response) => {
    try {
      const contacts = await Contact.find();
      if (contacts.length > 0) {
        return sucResponse(`${contacts.length} Contacts Found!`, res, contacts);
      } else {
        return errResponse(404, 'No Contacts Found!', res);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  // Set Contact password from reset password link
  public static setContactPassword = async (req: Request, res: Response) => {
    try {
      const contact = await Contact.findById(req.body.email);
      if (contact) {
        contact.password = req.body.password;
        contact.confirmPassword = req.body.confirmPassword;
        await contact.save();
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  // read a contact
  public static readContact = async (req: Request, res: Response) => {
    try {
      const contactId = req.params.id;
      const contact = await Contact.findById(contactId);
      if (!contact) {
        this.logger.error('Contact not found!');
        return errResponse(404, 'Contact Not Found!', res);
      } else {
        this.logger.info('Contact Found!', contact);
        return sucResponse('Found Contact!', res, contact);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  // update a contact
  public static updateContact = async (req: Request, res: Response) => {
    try {
      const update = {
        profileImageUrl: req.body.profileImageUrl,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        position: req.body.position,
        direction: req.body.direction,
        isPrimaryContact: req.body.isPrimaryContact,
        sendSetPasswordEmail: req.body.sendSetPasswordEmail,
        permissions: req.body.permissions,
        emailNotifications: req.body.emailNotifications,
        password: req.body.password
      };
      const contact = await Contact.updateOne({ _id: req.params.id }, { $set: update }, { upsert: true });
      if (contact) {
        this.logger.info('Contact Updated Successfully!');
        return sucResponse('Updated Contact!', res, contact);
      } else {
        this.logger.error('Contact Not Found!');
        return errResponse(404, 'Contact Not Found!', res);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  // delete a contact
  public static deleteContact = async (req: Request, res: Response) => {
    try {
      const contactId = req.params.id;
      const customer = await Contact.findByIdAndDelete(contactId);
      if (!customer) {
        this.logger.error('Contact not found!');
        return errResponse(404, 'Contact Not Found!', res);
      } else {
        return sucResponse('Contact Deleted!', res, customer);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };
}

export default contactsModule;
