import contactsModule from './contacts.module';
import Log from '../../../helpers/logger';
import { errResponse } from '../../../helpers/utils';

class ContactsController {
  private static logger: any = Log.getLogger();

  public static createContact = async (req, res) => {
    try {
      const result = await contactsModule.createContact(req);
      return res.status(200).send(result).end();
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, error.message);
    }
  };

  public static readContact = async (req, res) => {
    try {
      const result = await contactsModule.readContact(req);
      return res.status(200).send(result).end();
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, error.message);
    }
  };

  public static readAllContacts = async (req, res) => {
    try {
      const result = await contactsModule.readAllContacts();
      return res.status(200).send(result).end();
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, error.message);
    }
  };

  public static updateContact = async (req, res) => {
    try {
      const result = await contactsModule.updateContact(req);
      return res.status(200).send(result).end();
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, error.message);
    }
  };

  public static deleteContact = async (req, res) => {
    try {
      const result = await contactsModule.deleteContact(req);
      return res.status(200).send(result).end();
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, error.message);
    }
  };
}

export default ContactsController;
