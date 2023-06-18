export interface ExportXlsxOptions {
  sheetName: string;
  header: Record<string, any>;
  content: Record<string, any>;
  common: Record<string, any>;
  headerLabels: [string];
}

export const exportTo = {
  pdf: 'pdf',
  csv: 'csv',
  xlsx: 'xlsx'
};

const defaultConfig = {
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
    }
  }
};

export const ExportOptions = {
  notes: {
    headerLabels: ['Description', 'Added From', 'Date Added'],
    sheetName: 'Notes',
    header: defaultConfig.header,
    content: defaultConfig.content,
    common: defaultConfig.common
  }
};
