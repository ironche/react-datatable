import { useTranslation } from 'react-i18next';
import { TranslationNamespace } from '../i18n';
import { Typography } from '@mui/material';

export interface PaginationRangeProps {
  from: number;
  to: number;
  total: number;
}

export function PaginationRange(props: PaginationRangeProps) {
  const { t } = useTranslation([TranslationNamespace]);
  const tKey = 'data-table.pagination';

  return (
    <Typography variant="body2">
      {t(`${tKey}.range`, props)}
    </Typography>
  );
}
