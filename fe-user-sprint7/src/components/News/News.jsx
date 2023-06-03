import { Box, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import Ellipsis from 'components/Ellipsis/Ellipsis';
import { TitleLinkStyle } from 'components/TitleLink/TitleLink';
import { ROUTE_PATH } from 'consts/system.const';
import { DAY_FORMAT_NUMBER } from 'consts/date.const';
import { isEmpty } from 'lodash';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

const Tag = ({ children }) => (
  <Box
    sx={{
      paddingY: 1,
      paddingX: 2,
      background: '#E9E9E9',
      width: 'max-content',
      borderRadius: '4px',
      mr: '9px',
      cursor: 'pointer'
    }}
    onClick={() => {}}
  >
    {children}
  </Box>
);

export const News = ({ news }) => {
  const {
    attachmentLink,
    subject,
    lmsNewsLabels,
    createdDate,
    textContent,
    id,
    thumbnail,
    contentType
  } = news;
  const dateFormat = dayjs(createdDate).format(DAY_FORMAT_NUMBER);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%'
      }}
    >
      <Box>
        <Link
          to={`${ROUTE_PATH.NEWS_DETAIL}/${id}`}
          style={{ display: 'block', position: 'relative' }}
        >
          <img
            src={contentType === 'VIDEO' ? thumbnail : attachmentLink}
            alt={contentType === 'VIDEO' ? thumbnail : attachmentLink}
            style={{ width: '100%', borderRadius: '7px', aspectRatio: '1.5', objectFit: 'cover' }}
          />
          {contentType === 'VIDEO' && (
            <PlayArrowRoundedIcon
              sx={{
                color: '#fff',
                opacity: '0.9',
                position: 'absolute',
                height: '60px',
                width: '60px',
                top: '50%',
                left: '50%',
                backgroundSize: '60px 60px',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center'
              }}
            />
          )}
        </Link>
        <Box sx={{ mt: '15px', mb: '10px' }}>
          <TitleLinkStyle to={`${ROUTE_PATH.NEWS_DETAIL}/${id}`}>
            <Ellipsis line={2}>{subject}</Ellipsis>
          </TitleLinkStyle>
        </Box>
      </Box>
      <Box>
        {!isEmpty(lmsNewsLabels) && (
          <Box sx={{ display: 'flex', mb: '10px' }}>
            {lmsNewsLabels.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </Box>
        )}
        <Box sx={{ m: '10px 0' }}>
          <Typography>{dateFormat}</Typography>
        </Box>
        <Ellipsis style={{ fontWeight: 500 }} line={2}>
          {textContent && <div dangerouslySetInnerHTML={{ __html: textContent || '' }} />}
        </Ellipsis>
      </Box>
    </Box>
  );
};
