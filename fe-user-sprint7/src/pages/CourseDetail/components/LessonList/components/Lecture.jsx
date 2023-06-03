import React from 'react';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import HelpIcon from '@mui/icons-material/Help';
import FolderIcon from '@mui/icons-material/Folder';
// import PollIcon from '@mui/icons-material/Poll';
import MenuDownload from './MenuDownload';
import { Box, Checkbox, Typography } from '@mui/material';
import { setSelectLecture } from 'store/reducers/courseDetailSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Flex } from 'components/Layout/Flex';

const Lecture = ({ section, fatherIndex, childIndex, wrapperWidth }) => {
  const dispatch = useDispatch();

  const lessonData = useSelector((state) => state.courseDetail.lessonData);
  const lessonStructure = useSelector((state) => state.courseDetail.lessonStructure);
  const selectedLecture = useSelector((state) => state.courseDetail.selectedLecture);

  const isSelected =
    selectedLecture?.id === section?.id &&
    selectedLecture?.fatherIndex === fatherIndex &&
    selectedLecture?.childIndex === childIndex;

  const checkEnable = () => {
    if (lessonData?.completedByOrder) {
      if (section?.completed) {
        return true;
      } else if (fatherIndex === 0 && childIndex === 0) {
        return true;
      } else if (childIndex > 0) {
        return lessonStructure[fatherIndex].children[childIndex - 1]?.completed;
      } else if (childIndex === 0 && fatherIndex > 0) {
        return lessonStructure[fatherIndex - 1]?.children[
          lessonStructure[fatherIndex - 1]?.children.length - 1
        ]?.completed;
      }
    } else {
      return true;
    }
  };
  const handleSelectLesson = () => {
    if (checkEnable()) return dispatch(setSelectLecture({ ...section, fatherIndex, childIndex }));
    return toast.error('Bạn phải hoàn thành các bài học theo thứ tự');
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
      <Checkbox sx={{ padding: '0 0.5625rem' }} disabled checked={section?.completed} />
      <Box width={'100%'}>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Typography
            sx={{
              fontWeight: '500',
              fontSize: '14px',
              lineHeight: '135%',
              cursor: checkEnable() ? 'pointer' : 'not-allowed',
              color: !checkEnable() ? '#999' : isSelected ? '#1885df' : '#000000de'
            }}
            onClick={handleSelectLesson}
          >
            {section?.name?.split('.')?.at(0)}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <TypeLecture
            type={section?.type}
            data={section}
            isEnable={checkEnable()}
            wrapperWidth={wrapperWidth}
          />
        </Box>
      </Box>
    </Box>
  );
};

const LectureWrapper = ({ children, data, isEnable, downloadWidth, showDownload = true }) => (
  <Flex sx={{ justifyContent: 'space-between', width: '100%' }}>
    <Flex sx={{ alignItems: 'center' }}>{children}</Flex>
    {showDownload && (
      <Box>
        {data?.canDownload && (
          <MenuDownload data={data} width={downloadWidth} isEnable={isEnable} />
        )}
      </Box>
    )}
  </Flex>
);

const TimeText = ({ children }) => (
  <Typography sx={{ color: '#818181', fontSize: '0.75rem' }}>{children}</Typography>
);

const TypeLecture = ({ type, data, isEnable, wrapperWidth }) => {
  switch (type) {
    case 'VIDEO':
      return (
        <LectureWrapper data={data} isEnable={isEnable} downloadWidth={wrapperWidth}>
          <PlayCircleIcon sx={{ fontSize: '0.875rem', marginRight: '0.5rem', color: '#818181' }} />
          <TimeText>{data?.timeLong}</TimeText>
        </LectureWrapper>
      );
    case 'DOCUMENT':
      return (
        <LectureWrapper data={data} isEnable={isEnable} downloadWidth={wrapperWidth}>
          <FolderIcon sx={{ fontSize: '0.875rem', marginRight: '0.5rem', color: '#818181' }} />
          <TimeText>{data?.timeLong && `${data?.timeLong} trang`}</TimeText>
        </LectureWrapper>
      );
    case 'AICC':
      return (
        <LectureWrapper data={data} isEnable={isEnable} downloadWidth={wrapperWidth}>
          <FolderIcon sx={{ fontSize: '0.875rem', marginRight: '0.5rem', color: '#818181' }} />
          <TimeText>{data?.timeLong && `${data?.timeLong}`}</TimeText>
        </LectureWrapper>
      );
    case 'SCROM':
      return (
        <LectureWrapper data={data} isEnable={isEnable} downloadWidth={wrapperWidth}>
          <FolderIcon sx={{ fontSize: '0.875rem', marginRight: '0.5rem', color: '#818181' }} />
          <TimeText>{data?.timeLong && `${data?.timeLong}`}</TimeText>
        </LectureWrapper>
      );
    case 'EXAM':
      return (
        <LectureWrapper
          data={data}
          isEnable={isEnable}
          showDownload={false}
          downloadWidth={wrapperWidth}
        >
          <HelpIcon sx={{ fontSize: '0.875rem', marginRight: '0.5rem', color: '#818181' }} />
          <TimeText>{data?.totalQuestion && `${data?.totalQuestion} câu`}</TimeText>
        </LectureWrapper>
      );
    default:
      return null;
  }
};
export default Lecture;
