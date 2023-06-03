import React from 'react';
import { Box, Typography } from '@mui/material';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { Link } from 'react-router-dom';
import Ellipsis from 'components/Ellipsis/Ellipsis';
import { styled } from '@mui/system';
import { ROUTE_PATH } from 'consts/system.const';

const RecommendCourseItem = ({ item }) => {
  const ResponsiveItemsRight = styled(Box)`
    padding: 24px;
    display: flex;
    @media (max-width: 1200px) {
      padding-left: 0;
    }
  `;

  const { name, detail, id, pathPreview, contentType } = item;
  const typePreview = pathPreview?.split('.')?.at(-1);

  return (
    <ResponsiveItemsRight>
      <Box sx={{ width: '185px', mr: '24px' }}>
        <Link
          to={`${ROUTE_PATH.COURSE_INFORMATION}/${id}`}
          style={{ display: 'block', position: 'relative' }}
        >
          {/* <img
            src={pathPreview}
            alt={name}
            style={{ width: '100%', borderRadius: '10px', aspectRatio: '1.4', objectFit: 'cover' }}
          /> */}

          {typePreview === 'mp4' ? (
            <video alt={name} width={'100%'} src={pathPreview} />
          ) : (
            <img
              src={pathPreview}
              alt={name}
              style={{
                width: '100%',
                borderRadius: '10px',
                aspectRatio: '1.4',
                objectFit: 'cover'
              }}
            />
          )}
          {contentType === 'VIDEO' && (
            <PlayArrowRoundedIcon
              sx={{
                position: 'absolute',
                color: '#fff',
                opacity: '0.9',
                height: '45px',
                width: '45px',
                top: '50%',
                left: '50%',
                backgroundSize: '45px 45px',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center'
              }}
            />
          )}
        </Link>
      </Box>

      <Box sx={{ flex: '1' }}>
        <Link
          to={`${ROUTE_PATH.COURSE_INFORMATION}/${id}`}
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
            <Ellipsis line={2}>{name}</Ellipsis>
          </Typography>
        </Link>

        <Typography fontSize={18}>
          <Ellipsis style={{ whiteSpace: 'break-spaces' }}>
            {detail && <div dangerouslySetInnerHTML={{ __html: detail || '' }} />}
          </Ellipsis>
        </Typography>
      </Box>
    </ResponsiveItemsRight>
  );
};

export default RecommendCourseItem;
