import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  let navigate = useNavigate();
  const { t } = useTranslation();

  const goHome = () => navigate('/');
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}
    >
      <Typography variant="h3">{t('translation:not_found')}</Typography>
      <Button variant="contained" sx={{ marginTop: 2 }} onClick={goHome}>
        {t('translation:home')}
      </Button>
    </Box>
  );
};

export default NotFound;
