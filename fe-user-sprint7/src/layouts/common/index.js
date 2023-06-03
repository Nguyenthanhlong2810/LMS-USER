import { Box } from '@mui/material';
import Breadcrumb from 'layouts/Breadcrumb';
import React from 'react';
import { Header, Footer } from '../../layouts';

export const CommonLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Box className="common-layout-wrapper">
        <Breadcrumb />
        {children}
      </Box>
      <Footer />
    </>
  );
};
