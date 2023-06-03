import React from 'react';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import Slider from 'react-slick/lib/slider';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles/Quotes.scss';
import { useSelector } from 'react-redux';

export const Quotes = () => {
  const settings = {
    dots: false,
    infinite: true,
    accessibility: true,
    arrows: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  const { feedbacks } = useSelector(({ landing: { landingPageData } }) => landingPageData);

  return (
    <div className="quote-container">
      <div className="quote-icon-container">
        <FormatQuoteIcon className="quote-icon" />
      </div>
      <div>
        <Slider {...settings} className="slider">
          {feedbacks?.map((item, index) => {
            return (
              <div key={index} className="slide-item">
                <img src={item.imageLearnerLink} alt="Avatar" />
                <p className="quote">{item.contentFeedback}</p>
                <p className="info">{item.learnerName}</p>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};
