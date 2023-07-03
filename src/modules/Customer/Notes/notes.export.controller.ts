import { isEmpty } from 'lodash';
import Log from '../../../helpers/logger';
import { errResponse } from '../../../helpers/utils';
import notesExportModule from './notes.export.module';

class NotesExportController {
  private static logger: any = Log.getLogger();

  public static ExportNotes = async (req, res) => {
    try {
      if (isEmpty(req.params)) {
        this.logger.error('Bad request!');
        return errResponse(404, 'Bad Request!', res);
      }
      await notesExportModule.export(req, res);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };
}

export default NotesExportController;
