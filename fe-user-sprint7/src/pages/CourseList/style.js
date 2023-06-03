import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';

export const BoxContainerStyled = styled(Box)({
  width: '90%',
  height: '100%',
  margin: '2rem auto 4rem',

  borderRadius: '10px'
});

export const BoxUserHeaderStyled = styled(Box)({
  backgroundColor: '#374955',
  height: '100%',
  borderRadius: '7px'
});

export const BackgroundStyled = styled('div')({
  width: ' 15.875rem',
  // height: '100%',
  background: 'linear-gradient(180deg, #405766 0%, #374955 100%)',
  borderRadius: '7px',
  padding: '1.125rem',
  marginRight: '0.875rem'
});

export const UserInfoStyled = styled('div')({
  display: 'flex',
  alignItems: 'center',
  '.MuiAvatar-root': {
    marginRight: '0.875rem',
    border: '3px solid #fff'
  },
  '#name': {
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '133%',
    color: '#FFFFFF'
  },
  '#job': {
    fontWeight: '300',
    fontSize: '14px',
    lineHeight: ' 180%',
    color: '#D1D1D1'
  }
});

export const DoughnutChartStyled = styled('div')({
  '#doughnut-chart': {
    width: '5.5rem !important',
    height: '5.5rem !important',
    margin: '0 auto',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  '#name-chart': {
    fontWeight: 700,
    // fontSize: '14px',
    lineHeight: '190%',
    textAlign: 'center',
    color: '#FFFFFF'
  }
});
export const FlexChartDetailStyled = styled('div')({
  display: 'flex',
  alignItems: 'center',
  lineHeight: '190%',
  justifyContent: 'space-between',
  color: '#fff'
});

export const CourseListGridStyled = styled(Box)({
  marginTop: '22px',
  display: 'grid',
  gridGap: '20px',
  gridTemplateColumns: 'repeat(auto-fill, minmax(287px, 1fr))',
  gridAutoRows: '1fr'
});

export const CourseItemStyled = styled('div')({
  background: '#fff',
  padding: '14px',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '5px'
});

export const CourseImageStyled = styled('div')({
  height: '188px',
  flexShrink: 0,
  position: 'relative',
  marginBottom: '13px',
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }
});

export const CourseContentStyled = styled('div')({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
});

export const CourseDescriptionStyled = styled('div')({
  '#title': {
    fontWeight: '700',
    fontSize: '16px',
    lineHeight: '150%',
    textAlign: 'center',
    color: '#0A033C'
  },
  '#detail': {
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '190%',
    textAlign: 'center',
    color: ' #626262'
  }
});

export const CourseActionStyled = styled('div')({
  display: 'flex',
  flexDirection: 'column'
  // justifyContent: 'center'
});

export const CourseProcessStyled = styled('div')({
  fontWeight: '500',
  fontSize: '14px',
  lineHeight: '190%',
  color: ' #FFFFFF',
  background: '#55C763',
  borderRadius: '4px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});

export const ButtonStyled = styled(Button)({
  position: 'absolute',
  top: '10px',
  right: '10px',
  minWidth: '42px',
  height: '39px',
  paddingLeft: '0',
  paddingRight: '0',
  color: '#fff',
  '&.MuiButton-root': {
    background: ' rgba(255, 255, 255, 0.23)',
    border: '1px solid #fff'
  }
});

export const TypographyStyled = styled(Typography)({
  fontWeight: '700',
  fontSize: '1rem',
  lineHeight: '1.125rem',
  color: '#457EFF',
  display: '-webkit-box',
  WebkitLineClamp: '2',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden'
});
