import { Box, Divider, Typography } from '@mui/material';
import { CommonLayout } from 'layouts/common';
import { useTranslation } from 'react-i18next';
import { ProfileForm } from './components/ProfileForm';

const Profile = () => {
  const { t } = useTranslation();
  return (
    <CommonLayout>
      <Box px={8} py={4} m={4} bgcolor="white">
        <Typography mb={2} color="#0A033C" fontWeight={700} fontSize={29}>
          {t`profile:my-profile.personal-information`}
        </Typography>
        <Divider />
        <ProfileForm />
      </Box>
    </CommonLayout>
  );
};

export default Profile;
