import { useLayoutEffect, useMemo, useState, ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import { DataTableCol, DataTableRow, TableRowSize, TableTemplate } from './models/table';
import { TableHeader } from './components/TableHeader';
import { TableData } from './components/TableData';
import { LoadingTable } from './components/LoadingTable';
import { EmptyTable } from './components/EmptyTable';
import { Pagination } from './components/Pagination';

export * from './models/table';

export interface DataTableProps {
  cols: DataTableCol[];
  rows: DataTableRow[];
  totalRows: number;
  isLoading?: boolean;
  isSparseTable?: boolean;
  rowSize?: TableRowSize;
  title?: string | null;
  headerToolbar?: ReactNode;
  filterToolbar?: ReactNode;
  onSearch?: (term: string) => void;
  pageSizeOptions?: number[];
  onSetPage?: (value: number) => void;
  onSetPageSize?: (value: number) => void;
}

export function DataTable(props: DataTableProps) {
  const [template, setTemplate] = useState(TableTemplate.LOADING);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(() => {
    if (Array.isArray(props.pageSizeOptions) && props.pageSizeOptions.length) {
      return props.pageSizeOptions[0];
    }
    return 10;
  });

  const rows = useMemo<DataTableRow[]>(() => {
    if (Array.isArray(props.rows)) {
      if (!props.isSparseTable) {
        const rangeStart = page * pageSize;
        const rangeEnd = rangeStart + pageSize;
        return props.rows.slice(rangeStart, rangeEnd);
      }
      return props.rows;
    }
    return [];
  }, [props.rows, props.isSparseTable, page, pageSize]);

  useLayoutEffect(() => {
    if (props.isLoading) {
      setTemplate(TableTemplate.LOADING);
    } else {
      if (rows.length) {
        setTemplate(TableTemplate.DATA);
      } else {
        setTemplate(TableTemplate.EMPTY);
      }
    }
  }, [rows.length, props.isLoading]);

  function resetPage(): void {
    // setTemplate(TableTemplate.LOADING);
    setPage(0);
    props.onSetPage && props.onSetPage(0);
  }

  return (
    <DataTableWrapper>
      <TableHeader
        title={props.title}
        headerToolbar={props.headerToolbar}
        filterToolbar={props.filterToolbar}
        onSearch={(value) => {
          props.onSearch && props.onSearch(value);
          resetPage();
        }}
      />
      {template === TableTemplate.LOADING && <LoadingTable/>}
      {template === TableTemplate.EMPTY && <EmptyTable/>}
      {template === TableTemplate.DATA &&
        <TableData
          cols={props.cols}
          rows={rows}
          rowSize={props.rowSize}
        />
      }
      <Pagination
        itemCount={props.totalRows ?? rows.length}
        page={page}
        setPage={(next) => {
          setPage(next);
          props.onSetPage && props.onSetPage(next);
        }}
        pageSize={pageSize}
        setPageSize={(next) => {
          setPageSize(next);
          props.onSetPageSize && props.onSetPageSize(next);
          resetPage();
        }}
        pageSizeOptions={props.pageSizeOptions}
      />
    </DataTableWrapper>
  );
}

const DataTableWrapper = styled('section')(({theme}) => ({
  backgroundColor: theme.palette.background.paper,
}));
