import { Typography, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { TranslationNamespace } from '../i18n';

export function LoadingTable() {
  const { t } = useTranslation([TranslationNamespace]);
  const tKey = 'data-table.loading-table';

  return (
    <TableContainer>
      <Spinner color="secondary" />
      <Title variant="h4">{t(`${tKey}.title`)}</Title>
      <Typography variant="body2">{t(`${tKey}.description`)}</Typography>
    </TableContainer>
  );
}

const TableContainer = styled('div')({
  padding: 30,
  textAlign: 'center',
});

const Title = styled(Typography)({
  margin: '2em 0 1em',
});

const Spinner = styled(CircularProgress)({
  width: '6rem !important',
  height: '6rem !important',
});
