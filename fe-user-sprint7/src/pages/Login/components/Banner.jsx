import React from 'react';
import './styles/banner.scss';
import { useSelector } from 'react-redux';
export const Banner = () => {
  const { landingPageSetting } = useSelector(({ landing: { landingPageData } }) => landingPageData);

  return (
    <div className="banner-container">
      <div>
        <img src={landingPageSetting?.introduceImageLink1} alt="banner" />
      </div>
    </div>
  );
};
