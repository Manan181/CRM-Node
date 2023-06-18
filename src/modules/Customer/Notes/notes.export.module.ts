import Customer from './notes.model';
import { Request, Response } from 'express';
import Log from '../../../helpers/logger';
import { sucResponse, errResponse } from '../../../helpers/utils';
import { exportTo } from '../../../helpers/export/config';
import notesModel from './notes.model';

class notesExportModule {
  private static logger: any = Log.getLogger();

  public static export = async (req: Request, res: Response) => {
    try {
      const to = req.params.to;
      switch (to) {
        case exportTo.xlsx:
          return this.toXlsx(res);
        default:
          return errResponse(404, 'Export Option not supported!');
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };

  private static toXlsx = async (res: Response) => {
    const notes = await notesModel.aggregate([
      {
        $lookup: {
          from: 'customers',
          localField: 'customerId',
          foreignField: '_id',
          as: 'customer'
        }
      },
      {
        $project: {
          
        }
      }
    ]);
  };
}

export default notesExportModule;
