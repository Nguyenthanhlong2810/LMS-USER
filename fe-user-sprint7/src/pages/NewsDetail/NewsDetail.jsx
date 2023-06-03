import { Box } from '@mui/material';
import { CommonLayout } from 'layouts/common';
import { NewsDetailContainer } from './components/NewsDetailContainer';
import { NewsDetailSocialShare } from './components/NewsDetailSocialShare';

const NewsDetail = () => {
  return (
    <CommonLayout>
      <Box display="flex">
        <NewsDetailContainer />
        <NewsDetailSocialShare />
      </Box>
    </CommonLayout>
  );
};

export default NewsDetail;
