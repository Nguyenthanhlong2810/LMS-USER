import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar, IconButton, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material';
import { useAppSelector } from 'store/configureStore';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'store/reducers/userSlice';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { ROUTE_PATH } from 'consts/system.const';
import { useTranslation } from 'react-i18next';
import { useGetProfile } from 'pages/Profile/Profile.query';

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const user = useAppSelector((state) => state.user);
  const { data: profile } = useGetProfile(user.id);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { t } = useTranslation();
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onSignout = () => {
    dispatch(signOut());
    navigate(ROUTE_PATH.LOGIN);
  };

  const onGotoMyProfile = () => {
    navigate('/my-profile');
  };
  const avatarNameWord = profile?.fullname?.split(/\s+/g).at(-1)[0];

  return (
    <>
      <Typography sx={{ alignSelf: 'center' }}>{user.username}</Typography>
      <IconButton
        onClick={handleClick}
        size="small"
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Avatar sx={{ width: 32, height: 32 }} src={profile?.avatarUrl}>
          {/* <PersonOutlineOutlinedIcon /> */}
          {avatarNameWord}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={onGotoMyProfile}>
          <Avatar sizes="small" src={profile?.avatarUrl}>
            {avatarNameWord}
          </Avatar>{' '}
          {t`profile:my-profile.my-profile`}
        </MenuItem>
        <MenuItem onClick={onSignout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          {t`profile:my-profile.log-out`}
        </MenuItem>
      </Menu>
    </>
  );
}
