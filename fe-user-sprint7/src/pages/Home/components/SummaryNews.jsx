import { Box, Typography, styled } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import Ellipsis from 'components/Ellipsis/Ellipsis';
import { ROUTE_PATH } from 'consts';
const ResponsiveNewsRight = styled(Box)`
  padding: 24px;
  display: flex;
  @media (max-width: 1200px) {
    padding-left: 0;
  }
`;

export const SummaryNews = ({ news }) => {
  const { attachmentLink, subject, textContent, id, thumbnail, contentType } = news;
  return (
    <ResponsiveNewsRight>
      <Box sx={{ width: '185px', mr: '24px' }}>
        <Link
          to={`${ROUTE_PATH.NEWS_DETAIL}/${id}`}
          style={{ display: 'block', position: 'relative' }}
        >
          <img
            src={contentType === 'VIDEO' ? thumbnail : attachmentLink}
            alt={contentType === 'VIDEO' ? thumbnail : attachmentLink}
            style={{ width: '100%', borderRadius: '10px', aspectRatio: '1.4', objectFit: 'cover' }}
          />
          {/* {contentType === 'VIDEO' && <PlayArrowRoundedIcon size="45px" />} */}
        </Link>
      </Box>

      <Box sx={{ flex: '1', width: '200px' }}>
        <Link
          to={`${ROUTE_PATH.NEWS_DETAIL}/${id}`}
          style={{
            textDecoration: 'none',
            display: 'block',
            width: 'auto'
          }}
        >
          <Typography
            sx={{
              color: '#000',
              fontSize: 22,
              mb: 1,
              fontWeight: 700,
              transition: 'all 0.3s',
              ':hover': { color: '#1FBDF8' }
            }}
          >
            <Ellipsis line={2}>{subject}</Ellipsis>
          </Typography>
        </Link>

        <Typography fontSize={18}>
          <Ellipsis style={{ whiteSpace: 'break-spaces' }}>
            {textContent && <div dangerouslySetInnerHTML={{ __html: textContent || '' }} />}
          </Ellipsis>
        </Typography>
      </Box>
    </ResponsiveNewsRight>
  );
};
