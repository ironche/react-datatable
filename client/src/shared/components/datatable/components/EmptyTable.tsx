import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { TranslationNamespace } from '../i18n';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export function EmptyTable() {
  const { t } = useTranslation([TranslationNamespace]);
  const tKey = 'data-table.empty-table';

  return (
    <TableContainer>
      <ErrorOutlineIcon sx={{ fontSize: 96 }} />
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
