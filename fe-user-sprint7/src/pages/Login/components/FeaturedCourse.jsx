import React from 'react';
import Slider from 'react-slick/lib/slider';
import './styles/FeaturedCourse.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Card, Typography, CardContent, CardMedia } from '@mui/material';

export const FeaturedCourse = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1
  };
  const mockData = [
    {
      id: 1,
      src: 'https://i1.sndcdn.com/artworks-000667059784-au0m72-t500x500.jpg',
      content: 'Content 1'
    },
    {
      id: 2,
      src: 'https://dams.cdn.unippm.com/AlbumImages/370x370/5fc7a74ee52f4ee2a7fb5f5e4f7036d4.jpg',
      content: 'Content 2'
    },
    {
      id: 3,
      src: 'https://usercontent.jamendo.com/?cid=1436591839&type=album&id=149622&width=600',
      content: 'Content 3'
    },
    {
      id: 4,
      src: 'https://www.brightonandhovenews.org/wp-content/uploads/2018/01/101-front.jpg',
      content: 'Content 4'
    },
    {
      id: 5,
      src: 'https://dams.cdn.unippm.com/ThemedplaylistImages/315x315/4761daeebd5f4863bfb271f6cf0e8a99.jpg',
      content: 'Content 5'
    }
  ];

  return (
    <div className="slide-container">
      <h2>Featured course</h2>
      <Slider {...settings} className="slider">
        {mockData.map((item) => {
          return (
            <Card
              className="slide-item"
              key={item.id}
              variant="outlined"
              sx={{ maxWidth: 300, maxHeight: 365 }}
            >
              <CardMedia
                className="card-media"
                component="img"
                height="252"
                width="248"
                image={item.src}
                alt={'Image'}
              ></CardMedia>
              <CardContent className="card-content">
                <Typography>{item.content}</Typography>
              </CardContent>
            </Card>
          );
        })}
      </Slider>
    </div>
  );
};
