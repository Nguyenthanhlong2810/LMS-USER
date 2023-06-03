import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import React from 'react';
import { useGetNewsDetail } from '../NewsDetail.query';
import { BackButton, Video } from 'components';
import { useParams } from 'react-router-dom';
import 'styles/ckcontent.scss';

export const NewsDetailContainer = () => {
  const { id } = useParams();

  const { data: newsDetail } = useGetNewsDetail(id);
  if (!newsDetail) return 'Loading';

  const { attachmentLink, subject, textContent, contentType } = newsDetail?.data;

  return (
    <Box
      bgcolor="white"
      borderRadius="7px"
      p={5}
      m={2}
      display="flex"
      flexDirection="column"
      width="70%"
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <BackButton />
        <Typography fontWeight={700}>{subject}</Typography>
      </Stack>

      <Divider sx={{ marginTop: 1, marginBottom: 5 }} />
      <Box display="flex" justifyContent="center">
        {contentType === 'VIDEO' ? (
          <Video src={attachmentLink} />
        ) : (
          <img src={attachmentLink} width="100%" style={{ maxWidth: 844, borderRadius: '7px' }} />
        )}
      </Box>
      {/* <Typography sx={{ mt: '27px' }}> */}
      <div className="ck-content" style={{ marginTop: '15px' }}>
        {textContent && <div dangerouslySetInnerHTML={{ __html: textContent }} />}
      </div>
      {/* </Typography> */}
    </Box>
  );
};
