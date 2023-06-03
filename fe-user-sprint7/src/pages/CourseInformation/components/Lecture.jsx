import React from 'react';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import HelpIcon from '@mui/icons-material/Help';
import FolderIcon from '@mui/icons-material/Folder';
import PollIcon from '@mui/icons-material/Poll';
import { Box, styled, Typography } from '@mui/material';
import { Flex } from 'components/Layout/Flex';

const Lecture = ({ section }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        marginLeft: '1.75rem'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
        <TypeLecture type={section?.type} data={section} />
      </Box>
    </Box>
  );
};

const LectureNameBox = styled(Flex)({
  alignItems: 'center',
  width: '75%'
});
const LectureTimeBox = styled(Flex)({
  alignItems: 'center',
  justifyContent: 'end'
});
const LectureWrapper = styled(Flex)({
  justifyContent: 'space-between',
  width: '100%',
  gap: '1rem'
});

const TypeLecture = ({ type, data }) => {
  switch (type) {
    case 'VIDEO':
      return (
        <LectureWrapper>
          <LectureNameBox>
            <PlayCircleIcon sx={{ fontSize: '0.875rem', marginRight: '0.5rem' }} />
            <Typography sx={{ fontWeight: '500', fontSize: '14px', lineHeight: '135%' }}>
              {data?.name.replace(/(\.[^\.]*)$/, '')}
            </Typography>
          </LectureNameBox>
          <LectureTimeBox>
            <Typography>{data?.timeLong}</Typography>
          </LectureTimeBox>
        </LectureWrapper>
      );
    case 'DOCUMENT':
      return (
        <LectureWrapper>
          <LectureNameBox>
            <FolderIcon sx={{ fontSize: '0.875rem', marginRight: '0.5rem' }} />
            <Typography sx={{ fontWeight: '500', fontSize: '14px', lineHeight: '135%' }}>
              {data?.name.replace(/(\.[^\.]*)$/, '')}
            </Typography>
          </LectureNameBox>
          <LectureTimeBox>
            <Typography>{data?.timeLong && `${data?.timeLong} trang`}</Typography>
          </LectureTimeBox>
        </LectureWrapper>
      );
    case 'AICC':
      return (
        <LectureWrapper>
          <LectureNameBox>
            <FolderIcon sx={{ fontSize: '0.875rem', marginRight: '0.5rem' }} />
            <Typography sx={{ fontWeight: '500', fontSize: '14px', lineHeight: '135%' }}>
              {data?.name.replace(/(\.[^\.]*)$/, '')}
            </Typography>
          </LectureNameBox>
          <LectureTimeBox></LectureTimeBox>
        </LectureWrapper>
      );
    case 'SCROM':
      return (
        <LectureWrapper>
          <LectureNameBox>
            <FolderIcon sx={{ fontSize: '0.875rem', marginRight: '0.5rem' }} />
            <Typography sx={{ fontWeight: '500', fontSize: '14px', lineHeight: '135%' }}>
              {data?.name.replace(/(\.[^\.]*)$/, '')}
            </Typography>
          </LectureNameBox>
          <LectureTimeBox></LectureTimeBox>
        </LectureWrapper>
      );
    case 'EXAM':
      return (
        <LectureWrapper>
          <LectureNameBox>
            <HelpIcon sx={{ fontSize: '0.875rem', marginRight: '0.5rem' }} />
            <Typography sx={{ fontWeight: '500', fontSize: '14px', lineHeight: '135%' }}>
              {data?.name}
            </Typography>
          </LectureNameBox>
          <LectureTimeBox>
            <Typography>{data?.totalQuestion && `${data?.totalQuestion} câu`}</Typography>
          </LectureTimeBox>
        </LectureWrapper>
      );
    case 'SURVEY':
      return (
        <LectureWrapper>
          <LectureNameBox>
            <PollIcon sx={{ fontSize: '0.875rem', marginRight: '0.5rem' }} />
            <Typography sx={{ fontWeight: '500', fontSize: '14px', lineHeight: '135%' }}>
              {data?.name}
            </Typography>
          </LectureNameBox>
          <LectureTimeBox></LectureTimeBox>
        </LectureWrapper>
      );
    default:
      return null;
  }
};
export default Lecture;
