import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const ResponsiveListNews = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px 18px;
  padding-top: 30px;
  @media (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;
