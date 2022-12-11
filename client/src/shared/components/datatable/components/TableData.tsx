import {
  Table,
  TableBody,
  TableCell as MuiTableCell,
  TableContainer as MuiTableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { DataTableCol, DataTableRow, TableRowSize } from '../models/table';
import { styled } from '@mui/material/styles';

export interface TableDataProps {
  cols: DataTableCol[];
  rows: DataTableRow[];
  rowSize?: TableRowSize;
}

export function TableData(props: TableDataProps) {
  return (
    <TableContainer>
      <Table size={props.rowSize ?? 'medium'}>
        <TableHead>
          <TableRow>
            {props.cols.map((col, i) =>
              <TableCell key={i}>
                {col.renderHeader ? col.renderHeader(col.headerName) : col.headerName}
              </TableCell>
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {props.rows.map((row) =>
            <TableRow key={row.id}>
              {props.cols.map((col, i) =>
                <TableCell key={i}>
                  {col.renderCell ? col.renderCell(row[col.field], row) : row[col.field]}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const TableContainer = styled(MuiTableContainer)({
  width: 'auto',
  padding: '0 20px',
});

const TableCell = styled(MuiTableCell)`
  &.MuiTableCell-root {
    :first-of-type {
      padding-left: 0;
    }
    :last-of-type {
      padding-right: 0;
    }
  }
  &.MuiTableCell-head {
    font-weight: 600;
    font-size: 16px;
  }
`;
