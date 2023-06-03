import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';
import { isEmpty } from 'lodash';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from 'consts/system.const';
import { TitleLinkStyle } from 'components/TitleLink/TitleLink';
import 'styles/ckcontent.scss';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import './NewsSwiper.scss';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

export const NewsSwiper = ({ hotNews }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const navigateUrl = (id = '') => {
    navigate(`${ROUTE_PATH.NEWS_DETAIL}/${id}`);
  };

  return (
    <>
      <Typography fontWeight={700} fontSize={29} p="20px 0">
        {t`news:hot-news`}
      </Typography>
      <Slider {...settings}>
        {!isEmpty(hotNews) &&
          hotNews.map((news) => {
            const { attachmentLink, subject, textContent, id, contentType, thumbnail } = news;
            return (
              <Box key={attachmentLink} position="relative">
                <Link to={`${ROUTE_PATH.NEWS_DETAIL}/${id}`}>
                  <img
                    src={contentType === 'VIDEO' ? thumbnail : attachmentLink}
                    alt="hot-new-image"
                    width="100%"
                    style={{ height: '60vh', borderRadius: '7px', objectFit: 'cover' }}
                  />
                  {contentType === 'VIDEO' && <PlayCircleOutlineIcon className="icon-play-video" />}
                </Link>
                <Box
                  position="absolute"
                  right={0}
                  top={0}
                  bgcolor="white"
                  height="100%"
                  width="40%"
                  p={3}
                  sx={{ opacity: 0.9, display: 'flex', flexDirection: 'column' }}
                >
                  <TitleLinkStyle to={`${ROUTE_PATH.NEWS_DETAIL}/${id}`}>{subject}</TitleLinkStyle>
                  <div
                    className="ck-content"
                    style={{ margin: '30px 0', color: '#565771', flex: 1, overflow: 'hidden' }}
                  >
                    {textContent && (
                      <div
                        className="over-flow"
                        dangerouslySetInnerHTML={{ __html: textContent || '' }}
                      />
                    )}
                  </div>
                  <div>
                    <Button
                      variant="contained"
                      onClick={() => navigateUrl(id)}
                    >{t`news:read-story`}</Button>
                  </div>
                </Box>
              </Box>
            );
          })}
      </Slider>
    </>
  );
};
