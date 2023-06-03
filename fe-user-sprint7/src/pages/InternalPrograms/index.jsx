import React, { useState, useEffect } from 'react';
import { CommonLayout } from 'layouts/common';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import RecommendCourse from './components/RecommendCourse';
import { DEFAULT_PAGE_PARAMS } from 'consts/system.const';
import { BannerSlick } from './components/BannerSlick';
import { CourseAPI } from 'apis/Course/CourseAPI';
import { toast } from 'react-toastify';
import { BannerAPI } from 'apis/Banner/BannerAPI';
import Search from 'components/SearchCourse/SearchCourse';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';

const InternalPrograms = () => {
  const [imageBanner, setImageBanner] = useState([]);
  const [recommendCourseList, setRecommendCourseList] = useState([]);
  const [imgTime, setImgTime] = useState(null);
  const [bannerType, setBannerType] = useState('IMAGE');
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const getSearchCourse = (searchCourse) => {
    searchCourse.name &&
      navigate({
        pathname: '/search',
        search: createSearchParams(searchCourse).toString()
      });
  };
  useEffect(() => {
    getRecommendCourseList();
    getBanner();
  }, []);
  const getRecommendCourseList = async () => {
    try {
      const params = { ...DEFAULT_PAGE_PARAMS, pageSize: 5, sortBy: 'name', userId: user?.id };
      const res = await CourseAPI.getSuggestCourses(params);
      setRecommendCourseList(res?.data?.data?.items);
    } catch (error) {
      toast.error(t('error_occurred'));
    }
  };
  const getBanner = async () => {
    try {
      const res = await BannerAPI.getBanner();
      const data = res?.data;
      if (data && data?.type === 'IMAGE') {
        setBannerType(data?.type);
        const thumb = data?.thumbnails?.map((item) => item?.thumbnailLink);
        const imgList = [data?.attachmentLink, ...thumb];
        setImgTime(data?.imgTime * 1000);
        setImageBanner(imgList);
      }
      if (data && data?.type === 'VIDEO') {
        setBannerType(data?.type);
        setImgTime(null);
        setImageBanner(data?.attachmentLink);
      }
    } catch (error) {
      toast.error(t('error_occurred'));
    }
  };
  return (
    <CommonLayout>
      <Box sx={{ width: '95%', margin: '0 auto' }}>
        <BannerSlick
          key={uuidv4()}
          bannerType={bannerType}
          imageBanner={imageBanner}
          imgTime={imgTime}
        />
        <Search getSearchCourse={getSearchCourse} />
        <RecommendCourse recommendCourseList={recommendCourseList} />
      </Box>
    </CommonLayout>
  );
};
export default InternalPrograms;
