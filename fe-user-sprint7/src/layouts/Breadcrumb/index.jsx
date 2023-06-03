import React from 'react';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Box, Breadcrumbs, Divider, Link, Typography } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

import { breadcrumbNameMap } from './const';
import { useTranslation } from 'react-i18next';

const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

const Breadcrumb = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const pathnames = location.pathname.split('/').filter((x) => !parseInt(x) && x);
  if (!breadcrumbNameMap[`/${pathnames[0]}`]) return null;
  return (
    <Box m={4}>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        <LinkRouter underline="hover" to="/">
          {t`layout:bread-crumb.home`}
        </LinkRouter>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;

          return last ? (
            <Typography color="text.primary" key={to}>
              {t(`${breadcrumbNameMap[to]}`)}
            </Typography>
          ) : (
            <LinkRouter underline="hover" to={to} key={to}>
              {t(`${breadcrumbNameMap[to]}`)}
            </LinkRouter>
          );
        })}
      </Breadcrumbs>
      <Divider sx={{ marginTop: 1 }} />
    </Box>
  );
};

export default Breadcrumb;
