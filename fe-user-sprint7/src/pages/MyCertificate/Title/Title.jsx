import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
const Title = ({ total }) => {
  const { t } = useTranslation();
  return (
    <>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', mb: '2.3rem' }}
      >
        <Typography fontWeight={700} fontSize={29} pt="2.25rem">
          {t`certificate:certificate`}
        </Typography>
        <Typography sx={{ fontWeight: '400', fontSize: '1.25rem', lineHeight: '140%' }}>
          {t`translation:total`}:{' '}
          <Typography variant="span" sx={{ fontWeight: '700' }}>
            {total}
          </Typography>
        </Typography>
      </Box>
    </>
  );
};
export default Title;
