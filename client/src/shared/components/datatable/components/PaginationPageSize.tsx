import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TranslationNamespace } from '../i18n';
import { Typography, FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface PaginationPageSizeProps {
  currentSize: number;
  setCurrentSize: (next: number) => void;
  sizeOptions?: number[];
}

export function PaginationPageSize({
  sizeOptions = [10, 25, 50],
  ...props
}: PaginationPageSizeProps) {
  const { t } = useTranslation([TranslationNamespace]);
  const tKey = 'data-table.pagination';

  useEffect(() => {
    if (!sizeOptions.includes(props.currentSize)) {
      props.setCurrentSize(sizeOptions[0]);
    }
  }, [props, sizeOptions])

  function handlePageSizeChange(event: SelectChangeEvent<number>): void {
    props.setCurrentSize(event.target.value as number);
  }

  return (
    <PageSizeWrapper>
      <Typography variant="body2">
        {t(`${tKey}.pageSize`)}
      </Typography>
      <FormControl variant="outlined" size="small">
        <Select
          value={props.currentSize}
          onChange={handlePageSizeChange}
        >
          {sizeOptions.map((val, i) =>
            <MenuItem key={i} value={val}>{val}</MenuItem>
          )}
        </Select>
      </FormControl>
    </PageSizeWrapper>
  );
}

const PageSizeWrapper = styled('footer')({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, auto)',
  alignItems: 'center',
  gap: 10,
});
