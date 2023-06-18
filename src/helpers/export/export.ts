import { Workbook } from 'exceljs';
import { ExportXlsxOptions } from './config';

export const dataToXlsx = async (values, options: ExportXlsxOptions) => {
  const workBook = new Workbook();
  const workSheet = workBook.addWorksheet(options.sheetName);

  const headers = options.headerLabels;
  workSheet.addRow(headers).eachCell((cell) => {
    cell.font = options.header.font || {};
    cell.alignment = options.common.alignment || {};
  });

  workSheet.addRows(values);
  await workBook.xlsx.writeBuffer();
};
