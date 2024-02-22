import { ColumnDef } from '@tanstack/react-table';
import { ReactNode } from 'react';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    sortable?: boolean;
    filterable?: boolean;
  }
}

export interface TableProps<T> {
  data: Array<T>;
  columns: Array<ColumnDef<T, unknown>>;
  emptyDataMessage: string;
  renderButtons?: ReactNode;
  isLoading: boolean;
  filters: any;
  onChangeFilters: (event: any) => void;
  onChangePagination: (trigger: number) => void;
  onClearFilters: () => void;
  pagination: {
    totalCount: number;
    startCount: number;
    endCount: number;
    page: number;
    pages: number;
  };
}