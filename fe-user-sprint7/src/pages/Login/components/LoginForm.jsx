import Email from '@mui/icons-material/Email';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { ROUTE_PATH } from 'consts/system.const';
import { useError } from 'hooks/ErrorProvider';
import { useLoading } from 'hooks/LoadingProvider';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchLogin, fetchUser } from 'store/thunk/userThunk';
import '../styles.scss';

const Welcome = () => {
  return (
    <div className="welcome-message flex flex-col align-center">
      {/* <span className="title">Welcome to CMC Learning Management System</span> */}
      <span className="title">Chào mừng đến với hệ thống quản lý học tập của CMC</span>
      <div className="information">
        {/* <span>103,785</span> students + <span>424</span> Courses and More! */}
        <span>103,785</span> học viên + <span>424</span> Khóa học và nhiều hơn nữa!
      </div>
    </div>
  );
};
export const LoginForm = React.memo(() => {
  const { showLoading, hideLoading } = useLoading();
  const dispatch = useDispatch();
  const { addError } = useError();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    userName: '',
    password: ''
  });
  const { t } = useTranslation();
  const [rememberMe, setRememberMe] = useState(false);
  const { landingPageSetting } = useSelector(({ landing: { landingPageData } }) => landingPageData);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value.trim() });
  };
  const disabledLogin = !values.password || !values.userName;

  const onChangeRememberMe = (event) => {
    setRememberMe(event.target.checked);
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword
    });
  };
  const adminAccount = ['testDUL1', 'admin', 'testGL1'];
  const isAdmin = (user) => {
    return adminAccount.includes(user.userName) ? 'ROLE_ADMIN' : null;
  };
  const isClient = (user) => {
    return !adminAccount.includes(user.userName) ? 'ROLE_CLIENT' : null;
  };
  // const isUser = (user) => {
  //   return user.userName !== 'client' && user.userName !== 'admin' ? 'ROLE_USER' : null;
  // };

  const handleLogin = async () => {
    showLoading();
    try {
      const roles = [];
      // const email = isEmail(values.userName);
      const admin = isAdmin(values);
      const client = isClient(values);
      // const user = isUser(values);
      if (admin) roles.push(admin);
      if (client) roles.push(client);
      // if (user) roles.push(user);

      const paramQuery = {
        username: values.userName,
        password: values.password,
        // email: email ? values.userName : '',
        appUserRoles: roles,
        isLdap: !!client
      };

      const { payload } = await dispatch(fetchLogin(paramQuery));
      if (payload) {
        toast.success(t('login_successfully'));
        await dispatch(fetchUser());
        navigate(ROUTE_PATH.HOME, { replace: true });
      } else {
        toast.error(t('wrong_username_password'));
      }
    } catch (err) {
      if (err?.message === 'Network Error') {
        return toast.error(t('error_occurred'));
      }
      toast.error(err?.response?.data?.message || 'Tên đăng nhập hoặc mật khẩu không đúng');
      addError(err, 'Tên đăng nhập hoặc mật khẩu không đúng');
    } finally {
      hideLoading();
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <>
      <div
        style={{ backgroundImage: `url(${landingPageSetting?.formLoginLink})` }}
        className="login-form-container"
      >
        <div className="login-summary">
          <span>
            {/* <strong>How to</strong> learn to code? */}
            <strong>Làm sao</strong> để học code?
          </span>
          {/* <span>Easier to get started with coding on CMC Global</span> */}
          <span>Bắt đầu viết code trên CMC Global dễ dàng hơn</span>
        </div>
        <div className="login-form flex flex-col justify-center">
          <span className="title">Đăng nhập</span>
          <div className="login-inputs flex flex-col">
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1 },
                width: '100%'
              }}
              noValidate
              autoComplete="off"
            >
              <InputLabel required>{t`translation:username`}</InputLabel>
              <TextField
                id="input-username"
                onKeyDown={onKeyDown}
                required
                value={values.userName}
                onChange={handleChange('userName')}
                placeholder={t('placeholder_username')}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  )
                }}
                inputProps={{ maxLength: 100 }}
                autoFocus
                tabIndex={1}
              />
              <InputLabel required>{t`translation:password`}</InputLabel>
              <TextField
                id="outlined-password-input"
                value={values.password}
                type={values.showPassword ? 'text' : 'password'}
                onChange={handleChange('password')}
                onKeyDown={onKeyDown}
                autoComplete="current-password"
                placeholder={t('placeholder_password')}
                fullWidth
                tabIndex={2}
                inputProps={{ maxLength: 50 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        tabIndex={3}
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Box>
            {/* <div className="checkbox">
              <FormControlLabel
                control={<Checkbox onChange={onChangeRememberMe} value={rememberMe} />}
                label={t`translation:remember-me`}
              />
            </div> */}
          </div>
          <Button
            onClick={handleLogin}
            variant="contained"
            disabled={disabledLogin}
            sx={{
              backgroundColor: '#1FBDF8',
              color: '#fff',
              gap: '32px',
              width: '100%',
              padding: '14px 0px'
            }}
          >
            <img src={require('../../../assets/icon/cmc-icon.png')} alt="icon" />
            {t`translation:login-cmc`}
          </Button>
        </div>
      </div>
      <Welcome />
    </>
  );
});
LoginForm.displayName = 'LoginForm';
