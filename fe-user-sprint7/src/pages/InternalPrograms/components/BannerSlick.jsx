import { Box } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import { isEmpty } from 'lodash';

const settings = {
  dots: true,
  accessibility: true,
  arrows: false,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 3000,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1
};

export const BannerSlick = ({ bannerType, imageBanner, imgTime = 3000 }) => {
  const slickRef = useRef();

  useEffect(() => {
    slickRef.current && slickRef.current.slickGoTo(0);
  }, []);

  return (
    <>
      {bannerType === 'IMAGE' ? (
        <Slider ref={slickRef} {...settings} autoplaySpeed={imgTime}>
          {!isEmpty(imageBanner) &&
            imageBanner.map((imageSource) => {
              return (
                <Box key={imageSource} position="relative">
                  <img
                    src={imageSource}
                    alt="banner-image"
                    width="100%"
                    style={{
                      height: '467px',
                      maxHeight: '60vh',
                      borderRadius: '7px',
                      objectFit: 'cover'
                    }}
                  />
                </Box>
              );
            })}
        </Slider>
      ) : (
        <video
          src={imageBanner}
          width="100%"
          style={{ maxHeight: '60vh', borderRadius: '7px' }}
          autoPlay
          muted
          loop
        />
      )}
    </>
  );
};
