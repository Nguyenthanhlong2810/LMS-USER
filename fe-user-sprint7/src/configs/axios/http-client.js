import config from './config';
import { LOCAL_STORE } from 'consts/system.const';

import axios from 'axios';
import { localStorageHelper } from 'helpers';

import { httpStatus } from 'consts/status.const';
import { store } from 'store/configureStore';
import { signOut } from 'store/reducers/userSlice';
import { NO_RESPONSE_ERROR_MESSAGE } from 'consts/message.const';
import { toast } from 'react-toastify';

export const onSignOut = () => {
  store.dispatch(signOut());
};
const configAxios = {
  baseURL: config.HOST_API,
  headers: {
    'Content-Type': 'application/json'
  }
};
const httpClient = axios.create(configAxios);

httpClient.interceptors.request.use(
  async (config) => {
    const token = JSON.parse(localStorageHelper.getItem(LOCAL_STORE.TOKEN));
    if (localStorageHelper.isLogin()) {
      config.headers['Authorization'] = `Bearer ${token.value}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // const originalConfig = error.config;
    if (error.response) {
      switch (error.response.status) {
        case httpStatus.StatusUnauthorized:
          onSignOut();
          window.location.href = '/';
          return Promise.reject(error);
        case httpStatus.StatusForbidden:
          toast.error('Bạn không có quyền truy cập vào server.');
          return Promise.reject(error);
        // return (window.location.href = '/403');
        case httpStatus.StatusNotFound:
          window.location.href = '/404';
          return Promise.reject(error);
        default:
          return Promise.reject(error);
      }
    }
    return Promise.reject({ error, message: NO_RESPONSE_ERROR_MESSAGE });
  }
);

export default httpClient;
