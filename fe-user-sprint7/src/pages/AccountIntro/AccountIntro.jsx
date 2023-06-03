import { Box, Typography } from '@mui/material';
import { CommonLayout } from 'layouts/common';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store/configureStore';
import { AccountSteps } from './components/AccountSteps';

const AccountInfo = () => {
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (user?.firstLoginSetup) {
      navigate('/');
    }
  }, [user]);

  return (
    <CommonLayout>
      <Box display="flex" height="100%">
        <Box
          width="50%"
          p={10}
          bgcolor="white"
          sx={(theme) => ({
            [theme.breakpoints.down('lg')]: {
              display: 'none'
            }
          })}
        >
          <Typography variant="string" fontWeight={700} fontSize={29}>
            {t`profile:account-intro.hello`}
          </Typography>
          <Typography variant="string" fontWeight={700} fontSize={29} color="#55C763">
            {user?.username}
          </Typography>
          <Typography fontWeight={300} color="#565771" mt={2} mb={14}>
            {t`profile:account-intro.intro-description`}
          </Typography>
          <Box display="flex" justifyContent="center">
            <img src="/account-intro.svg" alt="account-intro" />
          </Box>
        </Box>
        <Box
          sx={(theme) => ({
            width: '50%',
            backgroundColor: '#1FBDF8',
            padding: '8rem',

            [theme.breakpoints.down('lg')]: {
              width: '100%',
              padding: '2rem'
            }
          })}
        >
          <AccountSteps />
        </Box>
      </Box>
    </CommonLayout>
  );
};

export default AccountInfo;
