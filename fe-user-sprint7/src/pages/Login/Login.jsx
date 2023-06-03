import { PublicApi } from 'apis/Public';
import { CommonLayout } from 'layouts/common';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLandingState } from 'store/reducers/landingSlice';
import { Advantages, Banner, Introduction, LoginForm, Quotes } from './components';

const Login = () => {
  const dispatch = useDispatch();
  const param = {
    language: 'vn'
  };
  useEffect(() => {
    PublicApi.getIntroLandingPage(param).then((res) => {
      dispatch(setLandingState(res.data.data));
    });
  });
  return (
    <CommonLayout>
      <LoginForm />
      <Advantages />
      <Banner />
      {/* <FeaturedCourse /> */}
      <Introduction />
      <Quotes />
    </CommonLayout>
  );
};
export default React.memo(Login);
