import Contact from './contacts.model';
import { Request } from 'express';
import Log from '../../../helpers/logger';
import { sucResponse, errResponse } from '../../../helpers/utils';
import config from '../../../config/config';
// import bcrypt from 'bcryptjs';

class contactsModule {
  private static logger: any = Log.getLogger();

  // create a new contact
  public static createContact = async (req: Request) => {
    try {
      const contact = new Contact({
        customerId: req.body.customerId,
        profileImageUrl: `${config.adminUrl}/${req.body.fileName}`,
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
      return sucResponse(200, 'Contact Saved!', savedContact);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };

  // get all contacts
  public static readAllContacts = async () => {
    try {
      const contacts = await Contact.find();
      if (contacts.length > 0) {
        return sucResponse(200, `${contacts.length} Contacts Found!`, contacts);
      } else {
        return errResponse(404, 'No Contacts Found!');
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };

  // Set Contact password from reset password link
  public static setContactPassword = async (req: Request) => {
    try {
      const contact = await Contact.findById(req.body.email);
      if (contact) {
        contact.password = req.body.password;
        contact.confirmPassword = req.body.confirmPassword;
        await contact.save();
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };

  // read a contact
  public static readContact = async (req: Request) => {
    try {
      const contactId = req.params.id;
      const contact = await Contact.findById(contactId);
      if (!contact) {
        this.logger.error('Contact not found!');
        return errResponse(404, 'Contact Not Found!', contact);
      } else {
        this.logger.info('Contact Found!', contact);
        return sucResponse(200, 'Found Contact!', contact);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };

  // update a contact
  public static updateContact = async (req: Request) => {
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
        return sucResponse(201, 'Updated Contact!', contact);
      } else {
        this.logger.error('Contact Not Found!');
        return errResponse(404, 'Contact Not Found!');
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };

  // delete a contact
  public static deleteContact = async (req: Request) => {
    try {
      const contactId = req.params.id;
      const customer = await Contact.findByIdAndDelete(contactId);
      if (!customer) {
        this.logger.error('Contact not found!');
        return errResponse(404, 'Contact Not Found!', customer);
      } else {
        return sucResponse(200, 'Contact Deleted!', customer);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };
}

export default contactsModule;
