import EastIcon from '@mui/icons-material/East';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { NewsAPI } from 'apis/News/NewsAPI';
import Ellipsis from 'components/Ellipsis/Ellipsis';
import { TitleLinkStyle } from 'components/TitleLink/TitleLink';
import { DEFAULT_PAGE_PARAMS, ROUTE_PATH } from 'consts/system.const';
import { CommonLayout } from 'layouts/common';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppSelector } from 'store/configureStore';
import { PlayIcon } from './components/PlayIcon';
import { SummaryNews } from './components/SummaryNews';
import RecommendCourse from './RecommendCourses/RecommendCourses';

const Home = () => {
  let navigate = useNavigate();
  const [newsList, setNewsList] = useState([]);
  const user = useAppSelector((state) => state.user);

  let firstNews = newsList[0];
  let secondNews = newsList.length > 0 ? newsList.slice(1) : [];

  const { t } = useTranslation();

  useEffect(() => {
    getNewsList();
  }, []);

  const getNewsList = async () => {
    try {
      const params = {
        ...DEFAULT_PAGE_PARAMS,
        pageSize: 5,
        status: true,
        keyword: '',
        isPinned: true
      };
      const res = await NewsAPI.getAllNews(params);
      setNewsList(res?.data?.data?.items);
    } catch (error) {
      toast.error(t('error_occurred'));
    }
  };

  useEffect(() => {
    if (user?.token && !user.firstLoginSetup) {
      navigate(ROUTE_PATH.ACCOUNT_INTRO);
    }
  }, []);

  const handleSeeAllNews = () => {
    navigate(ROUTE_PATH.NEWS_LIST);
  };

  return (
    <CommonLayout>
      <Box
        sx={{
          backgroundColor: '#F3F7F7',
          width: '90%',
          height: '100%',
          margin: '2rem auto',

          borderRadius: '10px',
          mt: '80px'
        }}
      >
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'end',
              mb: '2.4375rem'
            }}
          >
            <Typography fontWeight={700} fontSize={29} pt="34px">
              {t`news:news`}
            </Typography>
            <Button variant="contained" size="large" onClick={handleSeeAllNews}>
              <Typography fontSize={16}>{t`news:see-all`}</Typography>
              <EastIcon sx={{ ml: '10px', fontSize: '18px' }} />
            </Button>
          </Box>

          <Divider />
          <Grid container spacing={2}>
            <Grid item sm={12} md={6}>
              <Box sx={{ marginTop: '24px' }}>
                <Link
                  to={`${ROUTE_PATH.NEWS_DETAIL}/${firstNews?.id || ''}`}
                  style={{ display: 'block', position: 'relative' }}
                >
                  <img
                    src={
                      firstNews?.contentType === 'VIDEO'
                        ? firstNews?.thumbnail
                        : firstNews?.attachmentLink
                    }
                    alt={
                      firstNews?.contentType === 'VIDEO'
                        ? firstNews?.thumbnail
                        : firstNews?.attachmentLink
                    }
                    style={{
                      width: '100%',
                      borderRadius: '10px',
                      aspectRatio: '1.3',
                      objectFit: 'cover'
                    }}
                  />
                  {firstNews?.contentType === 'VIDEO' && <PlayIcon size="60px" />}
                </Link>
                <Box sx={{ mt: '48px' }}>
                  <TitleLinkStyle to={`${ROUTE_PATH.NEWS_DETAIL}/${firstNews?.id || ''}`}>
                    <Ellipsis line={2}>{firstNews?.subject || ''}</Ellipsis>
                  </TitleLinkStyle>
                  <Ellipsis style={{ fontSize: '18px', marginTop: '10px' }}>
                    {firstNews && (
                      <div dangerouslySetInnerHTML={{ __html: firstNews?.textContent || '' }} />
                    )}
                  </Ellipsis>
                </Box>
              </Box>
            </Grid>

            <Grid item sm={12} md={6}>
              <Box sx={{ display: 'grid' }}>
                {secondNews && secondNews.map((item) => <SummaryNews key={item.id} news={item} />)}
              </Box>
            </Grid>
          </Grid>
        </Box>
        <RecommendCourse />
      </Box>
    </CommonLayout>
  );
};

export default Home;
