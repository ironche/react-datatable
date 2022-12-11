import { useMemo } from 'react';
import { styled } from '@mui/material/styles';
import { PaginationPageSize } from './PaginationPageSize';
import { PaginationRange } from './PaginationRange';
import { PaginationNavigation } from './PaginationNavigation';

export interface PaginationProps {
  itemCount: number;
  page: number;
  setPage: (next: number) => void;
  pageSize: number;
  setPageSize: (next: number) => void;
  pageSizeOptions?: number[];
}

export function Pagination(props: PaginationProps) {
  const rangeStart = Math.min(props.itemCount, props.page * props.pageSize + 1);
  const rangeEnd = Math.min(props.itemCount, rangeStart + props.pageSize - 1);
  const totalPages = useMemo(() => {
    return (props.itemCount && props.pageSize) ? Math.ceil(props.itemCount / props.pageSize) : 0;
  }, [props.itemCount, props.pageSize]);

  return (
    <PaginationContainer>
      <PaginationPageSize
        sizeOptions={props.pageSizeOptions}
        currentSize={props.pageSize}
        setCurrentSize={props.setPageSize}
      />
      <PaginationRange
        from={rangeStart}
        to={rangeEnd}
        total={props.itemCount}
      />
      <PaginationNavigation
        pageCount={totalPages}
        currentPage={props.page}
        setCurrentPage={props.setPage}
      />
    </PaginationContainer>
  );
}

const PaginationContainer = styled('footer')({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, auto)',
  alignItems: 'center',
  justifyContent: 'end',
  gap: 30,
  padding: '5px 0',
});
