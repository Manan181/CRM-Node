import { Workbook } from 'exceljs';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ExportOptionsType, XlsxOptions, defaultExportConfig } from './config';

const generateWorkBook = (values, options: XlsxOptions, headers, applyStyles = true) => {
  const workBook = new Workbook();
  const workSheet = workBook.addWorksheet(options.sheetName || defaultExportConfig.xlsx.sheetName);

  //adding headers
  workSheet.addRow(headers);

  //adding data as rows
  workSheet.addRows(values);

  if (applyStyles) {
    //applying column styles
    workSheet.columns.forEach((column) => {
      column.width = options.common.minWidth || defaultExportConfig.xlsx.common.minWidth;
    });

    //apply header styles
    workSheet.getRow(1).eachCell((cell) => {
      cell.font = options.header.font || defaultExportConfig.xlsx.header.font;
    });

    //applying styles to every cell
    workSheet.eachRow(function (row) {
      row.eachCell((cell) => {
        cell.alignment = options.common.alignment || defaultExportConfig.xlsx.common.alignment;
      });
    });
  }

  return workBook;
};

export const dataToXlsx = async (values, options: ExportOptionsType) => {
  const workBook = generateWorkBook(values, options.xlsx, options.headerLabels);
  return await workBook.xlsx.writeBuffer();
};

export const dataToCsv = async (values, options) => {
  const workBook = generateWorkBook(values, options, options.headerLabels, false);
  return await workBook.csv.writeBuffer();
};

export const dataToPdf = async (values, sheetName, options: ExportOptionsType) => {
  const document = new jsPDF();

  //applying footer and Page number
  const pageCount = document.internal.pages.length - 1;
  document.setFontSize(options.pdf.footer.fontSize);
  for (let i = 1; i <= pageCount; i++) {
    document.setPage(i);
    document.text(`Page ${i} of ${pageCount}`, document.internal.pageSize.getWidth() - 25, document.internal.pageSize.getHeight() - 10);
  }

  //setting header
  document.setFontSize(options.pdf.content.fontSize);
  document.text(sheetName, 14, 15);

  //rendering data table
  autoTable(document, {
    startY: 20,
    head: [options.headerLabels],
    body: values,
    theme: options.pdf.common.theme || defaultExportConfig.pdf.common.theme
  });

  return await document.output('arraybuffer');
};
