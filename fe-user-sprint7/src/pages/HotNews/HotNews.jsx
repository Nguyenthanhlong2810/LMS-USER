import { Box } from '@mui/material';
import { CommonLayout } from 'layouts/common';
import React, { useEffect, useState } from 'react';
import { LatestNews } from './components/LatestNews';
import { NewsVideo } from './components/NewsVideo';
import { NewsSwiper } from './components/NewsSwiper';
import { NewsAPI } from 'apis/News/NewsAPI';
import { toast } from 'react-toastify';
import SearchNews from './components/SearchNews';
import { DEFAULT_PAGE_PARAMS, ROUTE_PATH } from 'consts/system.const';
import { useNavigate } from 'react-router-dom';
import { useLoading } from 'hooks/LoadingProvider';
import { useTranslation } from 'react-i18next';

export default function HotNews() {
  const { showLoading, hideLoading } = useLoading();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [hotNews, setHotNews] = useState([]);
  const [latestNews, setLatestNews] = useState(undefined);
  const [videoNews, setVideoNews] = useState([]);

  useEffect(() => {
    getNews();
  }, []);

  const getNews = async () => {
    try {
      showLoading();
      let [hotNewsRes, latestNewsRes, videoNewsRes] = await Promise.all([
        NewsAPI.getHotNews({ ...DEFAULT_PAGE_PARAMS, pageSize: 5, pageNo: 1 }),
        NewsAPI.getAllNews({
          ...DEFAULT_PAGE_PARAMS,
          keyword: '',
          contentType: 'NORMAL,COURSE_LINKED'
        }),
        NewsAPI.getAllNews({
          ...DEFAULT_PAGE_PARAMS,
          pageSize: 2,
          keyword: '',
          contentType: 'VIDEO'
        })
      ]);
      setHotNews(hotNewsRes?.data?.data?.items);
      setLatestNews(latestNewsRes?.data?.data?.items || []);
      setVideoNews(videoNewsRes?.data?.data?.items);
    } catch (error) {
      toast.error(t('error_occurred'));
    } finally {
      hideLoading();
    }
  };

  const getSearchNews = async (keyword) => {
    if (!keyword) {
      return;
    }
    navigate(`${ROUTE_PATH.NEWS_LIST}?search=${keyword}`);
  };

  return (
    <CommonLayout>
      <Box
        sx={{
          width: '90%',
          backgroundColor: '#fff',
          height: '100%',
          m: '2rem auto 4rem auto',

          borderRadius: '10px',
          mt: '64px'
        }}
      >
        <Box sx={{ width: '95%', margin: 'auto' }}>
          <NewsSwiper hotNews={hotNews} />
          <SearchNews getSearchNews={getSearchNews} />
          <LatestNews latestNews={latestNews} />
          <NewsVideo videoNews={videoNews} />
        </Box>
      </Box>
    </CommonLayout>
  );
}
