export interface XlsxOptions {
  sheetName: string;
  header: Record<string, any>;
  content: Record<string, any>;
  common: Record<string, any>;
}
export interface PdfOptions {
  header: Record<string, any>;
  content: Record<string, any>;
  footer: Record<string, any>;
  common: Record<string, any>;
}

export interface ExportOptionsType {
  xlsx: XlsxOptions;
  pdf: PdfOptions;
  headerLabels: string[];
}

export const exportTo = {
  pdf: 'pdf',
  csv: 'csv',
  xlsx: 'xlsx'
};

export const defaultExportConfig: ExportOptionsType = {
  headerLabels: [],
  xlsx: {
    sheetName: 'Sheet',
    header: {
      font: {
        name: 'Arial',
        family: 2,
        size: 10,
        bold: true
      }
    },
    content: {
      font: {
        name: 'Arial',
        family: 2,
        size: 8,
        bold: false
      }
    },
    common: {
      alignment: {
        vertical: 'middle',
        horizontal: 'center'
      },
      minWidth: 20
    }
  },
  pdf: {
    header: {},
    content: {
      fontSize: 12
    },
    footer: {
      fontSize: 8
    },
    common: {
      theme: 'striped'
    }
  }
};

export const ExportOptions: Record<string, ExportOptionsType> = {
  notes: {
    headerLabels: ['Description', 'Added From', 'Date Added'],
    xlsx: {
      sheetName: 'Notes',
      header: defaultExportConfig.xlsx.header,
      content: defaultExportConfig.xlsx.content,
      common: defaultExportConfig.xlsx.common
    },
    pdf: {
      common: defaultExportConfig.pdf.common,
      content: defaultExportConfig.pdf.content,
      footer: defaultExportConfig.pdf.footer,
      header: defaultExportConfig.pdf.header
    }
  }
};
