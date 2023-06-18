import notesModule from './notes.module';
import Log from '../../../helpers/logger';
import { errResponse } from '../../../helpers/utils';

class CustomerController {
  private static logger: any = Log.getLogger();

  public static createNote = async (req, res) => {
    try {
      if (!req.body) {
        this.logger.error('Bad Request!');
        return errResponse(404, 'Bad Request!');
      }
      const result = await notesModule.createNote(req);
      return res.status(200).send(result).end();
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, error.message);
    }
  };

  public static readNote = async (req, res) => {
    try {
      if (!req.body) {
        this.logger.error('Bad request!');
        return errResponse(404, 'Bad Request!');
      }
      const result = await notesModule.readNote(req);
      return res.status(200).send(result).end();
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, error.message);
    }
  };

  public static readAllNotes = async (req, res) => {
    try {
      const result = await notesModule.readAllNotes();
      return res.status(200).send(result).end();
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, error.message);
    }
  };

  public static updateNote = async (req, res) => {
    try {
      if (!req.params || !req.body) {
        this.logger.error('Bad request!');
        return errResponse(404, 'Bad Request!');
      }
      const result = await notesModule.updateNote(req);
      return res.status(200).send(result).end();
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, error.message);
    }
  };

  public static deleteNote = async (req, res) => {
    try {
      if (!req.params) {
        this.logger.error('Bad request!');
        return errResponse(404, 'Bad Request!');
      }
      const result = await notesModule.deleteNote(req);
      return res.status(200).send(result).end();
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, error.message);
    }
  };
}

export default CustomerController;
