import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, styled } from '@mui/material';
import { DEFAULT_PAGE_PARAMS } from 'consts/system.const';
import { CourseAPI } from 'apis/Course/CourseAPI';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import CousreItem from './components/CourseItem';
import Slider from 'react-slick';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const RecommendCourse = () => {
  const { t } = useTranslation();
  let navigate = useNavigate();
  const [recommendCourseList, setRecommendCourseList] = useState([]);
  const user = useSelector((state) => state.user);
  const handleSeeAllCourses = () => {
    navigate('/search');
  };
  const settings = {
    dots: false,
    accessibility: true,
    arrows: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };
  useEffect(() => {
    if (user?.id) {
      getRecommendCourseList();
    }
  }, [user]);
  const getRecommendCourseList = async () => {
    try {
      const params = { ...DEFAULT_PAGE_PARAMS, pageSize: 8, sortBy: 'name', userId: user?.id };
      const res = await CourseAPI.getSuggestCourses(params);
      setRecommendCourseList(res?.data?.data?.items);
    } catch (error) {
      toast.error(t('error_occurred'));
    }
  };
  return (
    <StyledBox>
      <Typography fontWeight={700} fontSize={29} pt="34px" sx={{ marginBottom: '1rem' }}>
        {t`course:recommend-courses`}
      </Typography>
      {/* <Slider {...settings} className="slider-recommend"> */}
      <div className="recommend">
        {recommendCourseList?.map((course, index) => {
          return <CousreItem key={index} course={course} />;
        })}
      </div>
      {/* </Slider> */}
      <Box sx={{ textAlign: 'center' }}>
        <Button variant="contained" sx={{ margin: '2rem auto' }} onClick={handleSeeAllCourses}>
          {t`news:see-all`}
          <ArrowForwardIcon />
        </Button>
      </Box>
    </StyledBox>
  );
};
export default RecommendCourse;
export const StyledBox = styled(Box)`
  margin-top: '3rem';
  margin-bottom: '10rem';
  .slider-recommend {
    .slick-list {
      padding: 1rem 0;
    }
  }
  .recommend {
    display: grid;
    gap: 1rem;
    grid-template-columns: 24% 24% 24% 24%;
  }
`;
