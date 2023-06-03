import { Box, Button, Typography } from '@mui/material';
import { News } from 'components/News/News';
import EastIcon from '@mui/icons-material/East';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';

export const NewsVideo = ({ videoNews }) => {
  let navigate = useNavigate();
  const { t } = useTranslation();

  const handleSeeAllVideos = () => {
    navigate('/news/news-list?content=video');
  };

  return (
    <>
      <Typography fontWeight={700} fontSize={29}>
        {t`news:videos`}
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridGap: '30px 18px',
          pt: '30px'
        }}
      >
        {!isEmpty(videoNews) && videoNews.map((item) => <News key={item.id} news={item} />)}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', p: '80px 0 60px 0' }}>
        <Button variant="contained" size="large" onClick={handleSeeAllVideos}>
          <Typography fontSize={16}>{t`news:see-all`}</Typography>
          <EastIcon sx={{ ml: '10px', fontSize: '18px' }} />
        </Button>
      </Box>
    </>
  );
};
NewsVideo.propTypes = {
  videoNews: PropTypes.array
};
