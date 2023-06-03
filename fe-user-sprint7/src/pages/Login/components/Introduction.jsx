import Button from '@mui/material/Button';
import React from 'react';
import { useSelector } from 'react-redux';
import './styles/introduction.scss';

export const Introduction = () => {
  const { landingPageSetting } = useSelector(({ landing: { landingPageData } }) => landingPageData);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return (
    <div className="introduction-container">
      <img src={landingPageSetting?.introduceImageLink2} alt="banner" />
      <div className="introduction-button-container">
        <Button
          variant="text"
          size="large"
          className="introduction-button"
          id="introduction-login-button"
          onClick={scrollToTop}
        >
          Đăng nhập
        </Button>
        {/* <Button
          variant="outlined"
          size="large"
          className="introduction-button"
          id="introduction-register-button">
          Register
        </Button> */}
      </div>
    </div>
  );
};
