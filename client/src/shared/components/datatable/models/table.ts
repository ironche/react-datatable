import { ReactNode } from 'react';

export interface DataTableCol {
  headerName: string;
  field: string;
  renderHeader?: (headerName: string) => ReactNode;
  renderCell?: (cellValue: any, rowValue?: any) => ReactNode;
}

export interface DataTableRow extends Record<string, any> {
  id: number | string;
}

export type TableRowSize = 'small' | 'medium';

export enum TableTemplate {
  LOADING,
  EMPTY,
  DATA,
}
