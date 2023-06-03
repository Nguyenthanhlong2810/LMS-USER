import { Box, Button } from '@mui/material';
import { styled } from '@mui/system';

export const CourseResultItemStyled = styled('div')({
  padding: '1.563rem',
  display: 'flex',
  justifyContent: 'left',
  alignItems: 'flex-start'
});

export const CourseResultImageStyled = styled('div')({
  marginRight: '1.563rem',
  img: {
    width: '10.563rem',
    height: '8.5rem',
    borderRadius: '10px',
    aspectRatio: '1.3',
    objectFit: 'cover'
  },
  video: {
    width: '10.563rem',
    height: '8.5rem',
    borderRadius: '10px',
    aspectRatio: '1.3',
    objectFit: 'cover'
  }
});
export const CourseResultTitleStyled = styled('div')({
  fontWeight: 700,
  fontSize: '20px',
  lineHeight: ' 250%',
  color: '#18181B'
});
export const CourseResultDescriptionStyled = styled('div')({
  fontWeight: 400,
  fontSize: '15px',
  lineHeight: ' 160%',
  color: '#201B40',
  wordBreak: 'break-all',
  display: '-webkit-box',
  WebkitLineClamp: '1',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
});

export const CourseResultLectureStyled = styled('div')({
  display: 'flex',
  alignItems: 'center',
  fontWeight: 600,
  fontSize: '15px',
  lineHeight: '300%',
  paddingTop: '0.25rem',
  color: '#71717A'
});
