import { Request, Response } from 'express';
import Log from '../../../helpers/logger';
import { errResponse, sucResponse } from '../../../helpers/utils';
import { ExportOptions, exportTo } from '../../../helpers/export/config';
import notesModel from './notes.model';
import { dataToCsv, dataToPdf, dataToXlsx } from '../../../helpers/export/export';
import customerModel from '../customer.model';
import { ObjectId } from 'mongodb';

class notesExportModule {
  private static logger: any = Log.getLogger();

  public static export = async (req: Request, res: Response) => {
    try {
      const to = req.params.to;
      const customerId = req.params.customerId;
      const customer = await customerModel.findById(customerId);
      const notes = await notesModel.aggregate([
        {
          $match: {
            customerId: new ObjectId(customerId)
          }
        },
        {
          $project: {
            _id: 0,
            row: {
              $concatArrays: [
                [
                  {
                    $ifNull: ['$noteDescription', '']
                  }
                ],
                [
                  {
                    $ifNull: ['$addedFrom', '']
                  }
                ],
                [
                  {
                    $ifNull: ['$createdAt', '']
                  }
                ]
              ]
            }
          }
        }
      ]);
      switch (to) {
        case exportTo.xlsx:
          return this.toXlsx(notes, customer.company, res);
        case exportTo.csv:
          return this.toCsv(notes, customer.company, res);
        case exportTo.pdf:
          return this.toPdf(notes, customer.company, res);
        default:
          return errResponse(404, 'Export Option not supported!', res);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', res, error);
    }
  };

  private static toXlsx = async (notes, fileName, res: Response) => {
    try {
      await dataToXlsx(
        notes.map((note) => {
          return note.row;
        }),
        ExportOptions.notes
      );
      if (result) {
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}.xlsx`);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        sucResponse('Success', res, result);
      } else {
        this.logger.error(500, `Error Generating Xlsx file`);
        errResponse(500, 'Something Went Wrong!!', res);
      }
    } catch (err) {
      this.logger.error(500, `Error Generating Xlsx file: ${err}`);
      errResponse(500, 'Something Went Wrong!!', res, err);
    }
  };

  private static toCsv = async (notes, fileName, res: Response) => {
    try {
      await dataToCsv(
        notes.map((note) => {
          return note.row;
        }),
        ExportOptions.notes
      );
      if (result) {
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}.csv`);
        res.setHeader('Content-Type', 'text/csv');
        sucResponse('Success', res, result);
      } else {
        this.logger.error(500, `Error Generating Csv file`);
        errResponse(500, 'Something Went Wrong!!', res);
      }
    } catch (err) {
      this.logger.error(500, `Error Generating Csv file: ${err}`);
      errResponse(500, 'Something Went Wrong!!', res, err);
    }
  };

  private static toPdf = async (notes, fileName, res: Response) => {
    try {
      await dataToPdf(
        notes.map((note) => {
          return note.row;
        }),
        fileName,
        ExportOptions.notes
      );
      if (result) {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}.pdf`);
        sucResponse('Success', res, Buffer.from(result));
      } else {
        this.logger.error(500, `Error Generating Pdf file`);
        errResponse(500, 'Something Went Wrong!!', res);
      }
    } catch (err) {
      this.logger.error(500, `Error Generating Pdf file: ${err}`);
      errResponse(500, 'Something Went Wrong!!', res, err);
    }
  };
}

export default notesExportModule;
