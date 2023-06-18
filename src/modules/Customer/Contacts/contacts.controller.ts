import contactsModule from './contacts.module';
import Log from '../../../helpers/logger';
import { errResponse, imageUpload } from '../../../helpers/utils';

class ContactsController {
  private static logger: any = Log.getLogger();

  public static createContact = async (req, res) => {
    try {
      if (!req.body) {
        this.logger.error('Bad Request!');
        return errResponse(404, 'Bad Request!');
      }
      if (req.files.image) {
        const fileName = await imageUpload(req.files.image);
        if (fileName) req.body.fileName = fileName;
      }
      const result = await contactsModule.createContact(req);
      return res.status(200).send(result).end();
    } catch (error) {
      this.logger.error(error);
      return errResponse(500, error.message, error);
    }
  };

  public static readContact = async (req, res) => {
    try {
      if (!req.params) {
        this.logger.error('Bad request!');
        return errResponse(404, 'Bad Request!');
      }
      const result = await contactsModule.readContact(req);
      return res.status(200).send(result).end();
    } catch (error) {
      this.logger.error(error);
      return errResponse(500, error.message, error);
    }
  };

  public static readAllContacts = async (req, res) => {
    try {
      const result = await contactsModule.readAllContacts();
      return res.status(200).send(result).end();
    } catch (error) {
      this.logger.error(error);
      return errResponse(500, error.message, error);
    }
  };

  public static setContactPassword = async (req, res) => {
    try {
      if (!req.body) {
        this.logger.error('Bad Request!');
        return errResponse(404, 'Bad Request!');
      }
      const result = await contactsModule.setContactPassword(req);
      return res.status(200).send(result).end();
    } catch (error) {
      this.logger.error(error);
      return errResponse(500, error.message, error);
    }
  };

  public static updateContact = async (req, res) => {
    try {
      if (!req.params || !req.body) {
        this.logger.error('Bad Request!');
        return errResponse(404, 'Bad Request!');
      }
      if (typeof req.body.permissions === 'string') req.body.permissions = JSON.parse(req.body.permissions);
      if (typeof req.body.emailNotifications === 'string') req.body.emailNotifications = JSON.parse(req.body.emailNotifications);
      const result = await contactsModule.updateContact(req);
      return res.status(200).send(result).end();
    } catch (error) {
      this.logger.error(error);
      return errResponse(500, error.message, error);
    }
  };

  public static deleteContact = async (req, res) => {
    try {
      if (!req.params) {
        this.logger.error('Bad request!');
        return errResponse(404, 'Bad Request!');
      }
      const result = await contactsModule.deleteContact(req);
      return res.status(200).send(result).end();
    } catch (error) {
      this.logger.error(error);
      return errResponse(500, error.message, error);
    }
  };
}

export default ContactsController;
