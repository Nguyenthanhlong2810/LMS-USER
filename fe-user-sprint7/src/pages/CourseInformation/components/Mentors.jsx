import React from 'react';
import { Box, Typography } from '@mui/material';
const Mentors = () => {
  return (
    <Box sx={{ background: '#FFFFFF', borderRadius: '7px', p: '1.5rem', marginTop: '1.875rem' }}>
      <Typography
        sx={{ fontWeight: '700', fontSize: '1.8125rem', lineHeight: '140%', marginBottom: '1rem' }}
      >
        Tên giảng viên
      </Typography>
      <Typography
        sx={{ fontWeight: '700', fontSize: '1.5rem', lineHeight: '140%', color: '#457EFF' }}
      ></Typography>
    </Box>
  );
};
export default Mentors;
