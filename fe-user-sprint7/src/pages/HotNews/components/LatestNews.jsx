import { Box, Button, Grid, Typography } from '@mui/material';
import { News } from 'components/News/News';
import EastIcon from '@mui/icons-material/East';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { isEmpty } from 'lodash';

export const LatestNews = ({ latestNews }) => {
  let navigate = useNavigate();
  const { t } = useTranslation();

  const handleSeeAllNews = () => {
    navigate('/news/news-list?content=normal,course_linked');
  };

  return (
    <>
      <Typography fontWeight={700} fontSize={29}>
        {t`news:latest-news`}
      </Typography>
      <Grid container spacing={2}>
        {latestNews ? (
          !isEmpty(latestNews) ? (
            latestNews.map((item) => (
              <Grid key={item.id} item xs={12} md={6} lg={4}>
                <News news={item} />
              </Grid>
            ))
          ) : (
            <Typography p="1rem" fontWeight={500}>{t`news:no-data`}</Typography>
          )
        ) : null}
      </Grid>

      {!isEmpty(latestNews) && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: '80px 0 60px 0' }}>
          <Button variant="contained" size="large" onClick={handleSeeAllNews}>
            <Typography fontSize={16}>{t`news:see-all`}</Typography>
            <EastIcon sx={{ ml: '10px', fontSize: '18px' }} />
          </Button>
        </Box>
      )}
    </>
  );
};
