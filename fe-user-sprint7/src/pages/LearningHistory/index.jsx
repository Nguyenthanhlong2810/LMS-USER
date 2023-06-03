import React from 'react';
import { CommonLayout } from 'layouts/common';
import Information from './Information/Information';
import ListCourseHistory from './ListCourseHistory/ListCourseHistory';
import { Box } from '@mui/material';
const LearningHistory = () => {
  return (
    <CommonLayout>
      <Box sx={{ width: '95%', margin: '0 auto' }}>
        <Information />
        <ListCourseHistory />
      </Box>
    </CommonLayout>
  );
};
export default LearningHistory;
