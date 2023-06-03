import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from 'store/configureStore';

const ProtectRoute = ({ allowedRoles }) => {
  const location = useLocation();
  const user = useAppSelector((state) => state.user);
  return user?.roles?.find((role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : (
    <Navigate to={'/'} state={{ from: location }} replace />
  );
};

export default ProtectRoute;
