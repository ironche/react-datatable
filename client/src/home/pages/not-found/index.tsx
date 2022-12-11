import { Avatar, Typography, Stack } from '@mui/material';
import { red } from '@mui/material/colors';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { useTranslation } from 'react-i18next';
import { TranslationNamespace } from '../../i18n';

export default function NotFoundPage() {
  const { t } = useTranslation([TranslationNamespace]);
  const tKey = 'pages.not-found';

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      direction="row"
      spacing={2}
    >
      <Typography variant="h3" color="error.main">
        {t(`${tKey}.message`)}
      </Typography>

      <Avatar sx={{ bgcolor: red[500] }}>
        <SentimentVeryDissatisfiedIcon />
      </Avatar>
    </Stack>
  );
}
