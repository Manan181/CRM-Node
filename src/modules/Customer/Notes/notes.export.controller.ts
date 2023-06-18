import Log from '../../../helpers/logger';
import { errResponse } from '../../../helpers/utils';
import notesExportModule from './notes.export.module';

class NotesExportController {
  private static logger: any = Log.getLogger();

  public static ExportNotes = async (req, res) => {
    try {
      if (!req.params) {
        this.logger.error('Bad request!');
        return errResponse(404, 'Bad Request!');
      }
      const result = await notesExportModule.export(req, res);
      return res.status(200).send(result).end();
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, error.message);
    }
  };
}

export default NotesExportController;
