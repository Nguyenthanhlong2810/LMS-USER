import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

export const TitleLinkStyle = styled(Link)({
  textDecoration: 'none',
  color: '#000',
  fontWeight: 700,
  fontSize: '20px',
  transition: 'all 0.3s',
  '&:hover': {
    color: '#1fbdf8'
  }
});
