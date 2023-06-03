import { ROUTE_PATH } from 'consts/system.const';
import { localStorageHelper } from 'helpers';
import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store/configureStore';
import AuthRoute from './AuthRoute';
import routes from './config';
import ProtectRoute from './ProtectRoute';

const NotFoundPage = React.lazy(() => import('pages/Errors/NotFound'));

export const AppRoutes = React.memo(() => {
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const isLogin = user.token && localStorageHelper.isLogin();
    if (!isLogin && window.location.pathname !== ROUTE_PATH.LOGIN) {
      return navigate('/login');
    }
    if (!user.firstLoginSetup) {
      return navigate('/');
    }
  }, []);

  return (
    <Routes>
      {routes.map(({ path, component: Component, isProtected, allowedRoles, isAuth }, i) => {
        if (isProtected) {
          return (
            <Route key={i} element={<ProtectRoute allowedRoles={allowedRoles} />}>
              <Route path={path} element={<Component />} />
            </Route>
          );
        }
        if (isAuth) {
          return (
            <Route key={i} element={<AuthRoute />}>
              <Route path={path} element={<Component />} />
            </Route>
          );
        }
        return <Route key={i} path={path} element={<Component />} />;
      })}

      <Route path={'*'} element={<NotFoundPage />} />
      <Route path={'/404'} element={<NotFoundPage />} />
    </Routes>
  );
});
AppRoutes.displayName = 'AppRoutes';
