import { Box, Button, Divider, Typography } from '@mui/material';
import { DAY_FORMAT_NUMBER } from 'consts/date.const';
import dayjs from 'dayjs';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  LinkedinShareButton,
  LinkedinIcon,
  EmailShareButton,
  EmailIcon
} from 'react-share';
import { useGetNewsDetail } from '../NewsDetail.query';
import EastIcon from '@mui/icons-material/East';
import CheckIcon from '@mui/icons-material/Check';
import { useAppSelector } from 'store/configureStore';
import { ROUTE_PATH } from 'consts';

export const NewsDetailSocialShare = () => {
  const { id } = useParams();
  const user = useAppSelector((state) => state.user);
  const { data: newsDetail } = useGetNewsDetail(id);
  const navigate = useNavigate();

  if (!newsDetail) return 'Loading';

  const { lastUpdated, createdDate } = newsDetail.data;
  const sharedUrl = window.location.href;
  const isCourseLink = newsDetail.data.contentType === 'COURSE_LINKED';
  const registered = newsDetail.data.userIds?.includes(user?.id);

  const handleRegister = () => {
    navigate(`${ROUTE_PATH.COURSE_INFORMATION}/${newsDetail.data.courseLink}`);
  };

  return (
    <Box bgcolor="white" borderRadius="7px" m={2} width="25%" display="flex" flexDirection="column">
      <Typography fontWeight={700} p={2}>
        {dayjs(lastUpdated || createdDate).format(DAY_FORMAT_NUMBER)}
      </Typography>
      <Divider />
      <Typography sx={{ padding: 2 }}>Chia sẻ</Typography>
      <Divider />
      <Box p={2}>
        <FacebookShareButton url={sharedUrl}>
          <FacebookIcon size={32} round style={{ marginRight: 16 }} />
        </FacebookShareButton>
        <TwitterShareButton url={sharedUrl}>
          <TwitterIcon size={32} round style={{ marginRight: 16 }} />
        </TwitterShareButton>
        <EmailShareButton url={sharedUrl}>
          <EmailIcon size={32} round style={{ marginRight: 16 }} />
        </EmailShareButton>
        <LinkedinShareButton url={sharedUrl}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
      </Box>
      {isCourseLink && (
        <>
          <Divider />
          <Box sx={{ p: '16px' }}>
            {registered ? (
              <Button
                onClick={handleRegister}
                color="success"
                sx={{ p: '10px' }}
                variant="contained"
                size="large"
              >
                <Typography fontSize={14}>Đã đăng ký</Typography>
                <CheckIcon sx={{ ml: '5px', fontSize: '15px' }} />
              </Button>
            ) : (
              <Button
                onClick={handleRegister}
                sx={{ p: '16px 80px' }}
                variant="contained"
                size="large"
              >
                <Typography fontWeight={700} fontSize={20}>
                  Đăng ký
                </Typography>
                <EastIcon sx={{ ml: '5px', fontSize: '20px' }} />
              </Button>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};
