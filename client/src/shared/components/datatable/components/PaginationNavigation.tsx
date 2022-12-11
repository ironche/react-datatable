import { IconButton } from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import LastPageIcon from '@mui/icons-material/LastPage';

export interface PaginationNavigationProps {
  pageCount: number;
  currentPage: number;
  setCurrentPage: (next: number) => void;
}

export function PaginationNavigation(props: PaginationNavigationProps) {
  const hasPrev = props.currentPage > 0;
  const hasNext = props.currentPage < props.pageCount - 1;

  return (
    <div>
      <IconButton disabled={!hasPrev} onClick={() => props.setCurrentPage(0)} size="large">
        <FirstPageIcon/>
      </IconButton>
      <IconButton
        disabled={!hasPrev}
        onClick={() => props.setCurrentPage(props.currentPage - 1)}
        size="large">
        <NavigateBeforeIcon/>
      </IconButton>
      <IconButton
        disabled={!hasNext}
        onClick={() => props.setCurrentPage(props.currentPage + 1)}
        size="large">
        <NavigateNextIcon/>
      </IconButton>
      <IconButton
        disabled={!hasNext}
        onClick={() => props.setCurrentPage(props.pageCount - 1)}
        size="large">
        <LastPageIcon/>
      </IconButton>
    </div>
  );
}
