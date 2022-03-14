export interface TableColumn {
  columnTitle: string | null;
  columnProp: string;
  columnType?: ColumnType;
  colspan?: number;
  width?: number;
}

export enum ColumnType {
  DATE = 'DATE',
  CURRENCY = 'CURRENCY',
  STRING = 'STRING',
}

export enum SummaryPeriod {
  DAY = 'DAY',
  MONTH = 'MONTH',
}
