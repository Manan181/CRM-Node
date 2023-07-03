import contactsModule from './contacts.module';
import Log from '../../../helpers/logger';
import { errResponse, imageUpload, sucResponse } from '../../../helpers/utils';
import { isEmpty } from 'lodash';

class ContactsController {
  private static logger: any = Log.getLogger();

  public static createContact = async (req, res) => {
    try {
      if (isEmpty(req.body)) {
        this.logger.error('Bad Request!');
        return errResponse(404, 'Bad Request!', res);
      }

      if (req?.files?.image) {
        const fileName = await imageUpload(req.files.image);
        if (fileName) req.body.fileName = fileName;
      }
      const result = await contactsModule.createContact(req, res);
      return sucResponse('Success', res, result);
    } catch (error) {
      this.logger.error(error);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static readContact = async (req, res) => {
    try {
      if (isEmpty(req.params)) {
        this.logger.error('Bad request!');
        return errResponse(404, 'Bad Request!', res);
      }
      const result = await contactsModule.readContact(req, res);
      return sucResponse('Success', res, result);
    } catch (error) {
      this.logger.error(error);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static readAllContacts = async (req, res) => {
    try {
      const result = await contactsModule.readAllContacts(res);
      return sucResponse('Success', res, result);
    } catch (error) {
      this.logger.error(error);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static setContactPassword = async (req, res) => {
    try {
      if (isEmpty(req.body)) {
        this.logger.error('Bad Request!');
        return errResponse(404, 'Bad Request!', res);
      }
      const result = await contactsModule.setContactPassword(req, res);
      return sucResponse('Success', res, result);
    } catch (error) {
      this.logger.error(error);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static updateContact = async (req, res) => {
    try {
      this.logger.info(req.body);
      if (isEmpty(req.params) || isEmpty(req.body)) {
        this.logger.error('Bad Request!');
        return errResponse(404, 'Bad Request!', res);
      }
      if (typeof req.body.permissions === 'string') req.body.permissions = JSON.parse(req.body.permissions);
      if (typeof req.body.emailNotifications === 'string') req.body.emailNotifications = JSON.parse(req.body.emailNotifications);
      await contactsModule.updateContact(req, res);
    } catch (error) {
      this.logger.error(error);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static deleteContact = async (req, res) => {
    try {
      if (isEmpty(req.params)) {
        this.logger.error('Bad request!');
        return errResponse(404, 'Bad Request!', res);
      }
      const result = await contactsModule.deleteContact(req, res);
      return sucResponse('Success', res, result);
    } catch (error) {
      this.logger.error(error);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };
}

export default ContactsController;
