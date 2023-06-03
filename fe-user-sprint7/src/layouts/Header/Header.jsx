import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { CategoryTrainingAPI } from 'apis/CategoryTraining';
import { ROUTE_PATH } from 'consts/system.const';
import { localStorageHelper } from 'helpers';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store/configureStore';
import { ReactComponent as HomepageLogo } from '../../assets/icon/homepage-logo.svg';
import MenuDropdownItem from './MenuDropdownItem/MenuDropdownItem';
import './styles.scss';
import UserMenu from './UserMenu/UserMenu';

export const Header = () => {
  const isLogin = localStorageHelper.isLogin();
  const user = useAppSelector((state) => state.user);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [headerItems, setHeaderItems] = useState([
    {
      name: t`layout:header.internal-programs`,
      path: ROUTE_PATH.INTERNAL_PROGRAMS,
      childsMenu: []
    },
    {
      name: t`layout:header.external-programs`,
      path: '/',
      childsMenu: null
    },
    {
      name: t`layout:header.my-learning`,
      path: '/my-course',
      childsMenu: [
        {
          name: t`layout:header.my-course`,
          path: '/my-course'
        },
        // {
        //   name: t`layout:header.learning-history`,
        //   path: '/my-profile/learning-history'
        // },
        {
          name: t`layout:header.my-certificate`,
          path: '/my-certificate'
        }
      ]
    },
    {
      name: t`layout:header.news`,
      path: '/news'
    }
  ]);

  useEffect(() => {
    if (isLogin) {
      getMenuInternal();
    }
  }, []);

  const getMenuInternal = async () => {
    const res = await CategoryTrainingAPI.getMenuInternal();
    if (res.data) {
      const data = res.data.data;
      data?.forEach((c) => setPathForInternalMenu(c));

      const newHeaderItems = [...headerItems];
      newHeaderItems[0].childsMenu = data;
    }
  };

  const setPathForInternalMenu = (item) => {
    if (item.childsMenu) {
      for (let child of item.childsMenu) {
        setPathForInternalMenu(child);
      }
    }
    item.path = '/search?topics=' + item.name;
  };

  return (
    <Box sx={{ flexGrow: 1 }} className="header-container">
      <AppBar
        position="static"
        sx={{ backgroundColor: '#FFF', color: '#0A033C', boxShadow: 'none' }}
      >
        <Toolbar sx={{ gap: '45px' }}>
          <Link
            to="/"
            onClick={(e) => {
              if (!isLogin) {
                navigate('/login');
              }
            }}
          >
            <HomepageLogo />
          </Link>
          {headerItems.map((item, i) => (
            <MenuDropdownItem
              menuItem={item}
              key={i}
              placement="bottom-start"
              showArrow={false}
              isHead
            />
            // <Link key={i} to={item.path} className="header-link">
            //   {item.title}
            // </Link>
          ))}
          <Box
            className="header-button-group"
            sx={{ display: 'flex', gap: '20px', marginLeft: 'auto' }}
          >
            {/* <Button variant="outlined">
              <Link to="/login">Login</Link>
            </Button>
            <Button
              variant="contained"
              disableElevation
              color="success"
              sx={{ backgroundColor: '#55C763' }}
            >
              Register
            </Button> */}
            {isLogin && user.firstLoginSetup && <UserMenu />}
            {/* <LanguageSelector /> */}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
