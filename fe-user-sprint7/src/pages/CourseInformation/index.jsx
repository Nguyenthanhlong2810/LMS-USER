import React, { useEffect, useState } from 'react';
import { CommonLayout } from 'layouts/common';
import HeaderBanner from './components/HeaderBanner';
import { Box, Grid } from '@mui/material';
import LessonContent from './components/LessonContent';
import LessonInformation from './components/LessonInformation';
import Requirements from './components/Requirements';
import { useNavigate, useParams } from 'react-router-dom';
import { CourseAPI } from 'apis/Course/CourseAPI';
import LessonDescription from './components/LessonDescription';
import Mentors from './components/Mentors';
import { formatResponseData } from './utils';
const CourseInformation = () => {
  const [courseOverallData, setCourseOverallData] = useState({});
  const [lessonStructure, setLessonStructure] = useState([]);
  const navigate = useNavigate();

  let { id } = useParams();

  useEffect(() => {
    if (id === 'null') {
      navigate('404');
    }
    getLessonStructure();
    getCourseOverallData();
  }, [id]);
  const getCourseOverallData = async () => {
    try {
      const res = await CourseAPI.getCourseOverallData(id);
      setCourseOverallData(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getLessonStructure = async () => {
    try {
      const res = await CourseAPI.getListLessonStructure(id);
      if (res?.data) {
        const formatedData = formatResponseData(res?.data?.data?.lessonStructures);
        if (formatedData) {
          setLessonStructure(formatedData);
        } else {
          setLessonStructure([]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <CommonLayout>
      <HeaderBanner courseOverallData={courseOverallData} />
      <Grid container sx={{ width: '86%', margin: '60px auto' }}>
        <Grid item md={8} sx={{ paddingRight: '24px' }}>
          <LessonContent lessonStructure={lessonStructure} />
          <Requirements courseOverallData={courseOverallData} />
          <LessonDescription courseOverallData={courseOverallData} />
          <Mentors courseOverallData={courseOverallData} />
        </Grid>
        <Grid item md={4}>
          <LessonInformation courseOverallData={courseOverallData} id={id} />
        </Grid>
      </Grid>
    </CommonLayout>
  );
};
export default CourseInformation;
