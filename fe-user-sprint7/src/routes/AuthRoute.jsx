import { localStorageHelper } from 'helpers';
import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

const AuthRoute = () => {
  const location = useLocation();
  return localStorageHelper.isLogin() ? (
    <Navigate to={'/'} state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export default AuthRoute;
