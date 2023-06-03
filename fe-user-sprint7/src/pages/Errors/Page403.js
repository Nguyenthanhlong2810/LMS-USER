import { Box, Button, Stack, Typography } from '@mui/material';
import { onSignOut } from 'configs/axios/http-client';
import { t } from 'i18next';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Page403 = () => {
  let navigate = useNavigate();
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
      <Typography variant="h3">{t('403')}</Typography>
      <Stack direction="row" spacing={2} mt={2}>
        <Button variant="contained" onClick={goHome}>
          {t('home')}
        </Button>
        <Button variant="contained" onClick={onSignOut}>
          {t('sign_out')}
        </Button>
      </Stack>
    </Box>
  );
};

export default Page403;
