import { Avatar, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CourseDetailLessonNameStyled = styled('div')({
  fontWeight: '700',
  color: '#201B40',
  fontSize: '14px',
  lineHeight: '150%',
  span: {
    color: '#818181',
    fontWeight: 300
  }
});
export const AvatarStyled = styled(Avatar)({
  background: '#fff',
  color: '#565771',
  border: '1px solid #e9e9e9',
  width: '4rem',
  height: '4rem',
  fontSize: '0.875rem',
  padding: '4px'
  // ':hover': {
  //   cursor: 'pointer'
  // }
});
export const TextFieldStyled = styled(TextField)({
  width: '100%',
  '.MuiInputBase-input': {
    padding: '0 !important'
  }
});
