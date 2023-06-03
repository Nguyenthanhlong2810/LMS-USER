import React from 'react';
import { Box, Grid, Typography, styled } from '@mui/material';
import backgroundImage from 'assets/img/courseInformationBg.png';
const HeaderBanner = ({ courseOverallData }) => {
  return (
    <>
      <ResponsiveBox sx={{ backgroundImage: `url(${backgroundImage})` }}>
        <Grid container sx={{ padding: '75px 0', width: '86%', margin: '0 auto' }}>
          <Grid item sm={12} md={6}>
            <Typography
              sx={{ fontSize: '37px', fontWeight: '700', color: '#fff', lineHeight: '140%' }}
            >
              {courseOverallData?.courseName}
            </Typography>
            <Typography
              sx={{ fontSize: '16px', fontWeight: '500', color: '#fff', lineHeight: '170%' }}
            >
              {courseOverallData?.summary}
            </Typography>
            <Box sx={{ marginTop: '60px' }}>
              {courseOverallData?.tagList?.map((item) => (
                <StyledTag key={item?.id}>{item?.name}</StyledTag>
              ))}
            </Box>
          </Grid>
          <Grid item sm={0} md={2} />
          <Grid item sm={12} md={4} className="offeredBy">
            <Typography
              sx={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#fff',
                lineHeight: '140%',
                marginBottom: '32px'
              }}
            >
              {courseOverallData?.isOfferedBy === null
                ? ''
                : courseOverallData?.isOfferedBy === false
                ? 'Hợp tác với'
                : 'Cung cấp bởi'}
            </Typography>
            {courseOverallData?.providedPath && (
              <img
                src={courseOverallData?.providedPath}
                alt={'logo'}
                style={{ maxWidth: '300px', maxHeight: '200px', borderRadius: 7 }}
              />
            )}
          </Grid>
        </Grid>
      </ResponsiveBox>
    </>
  );
};
export default HeaderBanner;
export const StyledTag = styled(Box)({
  display: 'inline-block',
  backgroundColor: '#fff',
  padding: '10px',
  borderRadius: '7px',
  margin: '5px'
});
export const ResponsiveBox = styled(Box)`
  .offeredBy {
    @media (max-width: 900px) {
      margin-top: 24px;
    }
  }
`;
