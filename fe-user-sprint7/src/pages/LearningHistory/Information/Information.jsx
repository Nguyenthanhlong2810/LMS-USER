import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, styled } from '@mui/material';
import { UserAPI } from 'apis/User/UserAPI';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const Information = () => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);
  const [userInfor, setUserInfor] = useState({});
  useEffect(() => {
    getUserInformation();
  }, []);
  const getUserInformation = async () => {
    try {
      const res = await UserAPI.getUserById(user?.id);
      if (res?.data?.email) {
        res.data.ldap = res?.data?.email.slice(0, res?.data?.email?.indexOf('@'));
      }
      if (res?.data?.managerEmail) {
        res.data.managerldap = res?.data?.managerEmail.slice(
          0,
          res?.data?.managerEmail?.indexOf('@')
        );
      }
      setUserInfor(res?.data);
    } catch (error) {
      toast.error(t('error_occurred'));
    }
  };
  return (
    <Box sx={{ margin: '48px auto 20px auto' }}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Typography sx={{ fontWeight: '700', fontSize: '1.8rem', lineHeight: '140%' }}>
            Thông tin học viên
          </Typography>
          <Grid container sx={{ marginTop: '1.25rem', padding: '0 0.75rem ' }}>
            <Grid item xs={12} md={3} sx={{ margin: '0.5rem 0' }}>
              <StyledTitle>Họ và tên</StyledTitle>
            </Grid>
            <Grid item xs={12} md={9} sx={{ margin: '0.5rem 0' }}>
              <StyledTypho>{userInfor?.fullname}</StyledTypho>
            </Grid>
            <Grid item xs={12} md={3} sx={{ margin: '0.5rem 0' }}>
              <StyledTitle>LDAP</StyledTitle>
            </Grid>
            <Grid item xs={12} md={9} sx={{ margin: '0.5rem 0' }}>
              <StyledTypho>{userInfor?.ldap}</StyledTypho>
            </Grid>
            <Grid item xs={12} md={3} sx={{ margin: '0.5rem 0' }}>
              <StyledTitle>Email</StyledTitle>
            </Grid>
            <Grid item xs={12} md={9} sx={{ margin: '0.5rem 0' }}>
              <StyledTypho>{userInfor?.email}</StyledTypho>
            </Grid>
            <Grid item xs={12} md={3} sx={{ margin: '0.5rem 0' }}>
              <StyledTitle>Tên đơn vị</StyledTitle>
            </Grid>
            <Grid item xs={12} md={9} sx={{ margin: '0.5rem 0' }}>
              <StyledTypho>{userInfor?.department}</StyledTypho>
            </Grid>
            <Grid item xs={12} md={3} sx={{ margin: '0.5rem 0' }}>
              <StyledTitle>Tên khối</StyledTitle>
            </Grid>
            <Grid item xs={12} md={9} sx={{ margin: '0.5rem 0' }}>
              <StyledTypho>{userInfor?.division}</StyledTypho>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography sx={{ fontWeight: '700', fontSize: '1.8rem', lineHeight: '140%' }}>
            Thông tin người quản lý
          </Typography>
          <Grid container sx={{ marginTop: '1.25rem', padding: '0 0.75rem ' }}>
            <Grid item xs={12} md={3} sx={{ margin: '0.5rem 0' }}>
              <StyledTitle>Họ và tên</StyledTitle>
            </Grid>
            <Grid item xs={12} md={9} sx={{ margin: '0.5rem 0' }}>
              <StyledTypho>{userInfor?.managerName}</StyledTypho>
            </Grid>
            <Grid item xs={12} md={3} sx={{ margin: '0.5rem 0' }}>
              <StyledTitle>LDAP</StyledTitle>
            </Grid>
            <Grid item xs={12} md={9} sx={{ margin: '0.5rem 0' }}>
              <StyledTypho>{userInfor?.managerldap}</StyledTypho>
            </Grid>
            <Grid item xs={12} md={3} sx={{ margin: '0.5rem 0' }}>
              <StyledTitle>Email</StyledTitle>
            </Grid>
            <Grid item xs={12} md={9} sx={{ margin: '0.5rem 0' }}>
              <StyledTypho>{userInfor?.managerEmail}</StyledTypho>
            </Grid>
            <Grid item xs={12} md={3} sx={{ margin: '0.5rem 0' }}>
              <StyledTitle>Tên đơn vị</StyledTitle>
            </Grid>
            <Grid item xs={12} md={9} sx={{ margin: '0.5rem 0' }}>
              <StyledTypho>{userInfor?.department}</StyledTypho>
            </Grid>
            <Grid item xs={12} md={3} sx={{ margin: '0.5rem 0' }}>
              <StyledTitle>Tên khối</StyledTitle>
            </Grid>
            <Grid item xs={12} md={9} sx={{ margin: '0.5rem 0' }}>
              <StyledTypho>{userInfor?.division}</StyledTypho>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Information;
const StyledTitle = styled(Typography)`
  font-weight: 500;
  font-size: 1rem;
  line-height: 170%;
  color: '#565771';
`;
const StyledTypho = styled(StyledTitle)`
  color: '#201B40';
`;
