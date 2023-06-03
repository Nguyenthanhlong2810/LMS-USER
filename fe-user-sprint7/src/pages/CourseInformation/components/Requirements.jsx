import React from 'react';
import { Typography, Box, styled } from '@mui/material';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
const Requirements = ({ courseOverallData }) => {
  return (
    <Box sx={{ background: '#FFFFFF', borderRadius: '7px', p: '1.5rem', marginTop: '1.875rem' }}>
      <Typography
        sx={{
          fontWeight: '700',
          fontSize: '29px',
          lineHeight: '140%',
          color: '#0A033C'
        }}
      >
        Yêu cầu
      </Typography>
      {courseOverallData?.requirementCourses?.map((item) => (
        <StyledText key={item?.id}>
          <LockOpenOutlinedIcon sx={{ marginRight: '16px' }} />
          {item?.name}
        </StyledText>
      ))}
    </Box>
  );
};
export default Requirements;
export const StyledText = styled(Typography)({
  fontWeight: '500',
  fontSize: '1rem',
  lineHeight: '170%',
  marginTop: '1rem',
  display: 'flex',
  color: '#565771',
  alignItems: 'center'
});
