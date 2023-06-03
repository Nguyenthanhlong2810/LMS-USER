import config from './config';

import axios from 'axios';

import { httpStatus } from 'consts/status.const';
import { toast } from 'react-toastify';

const signOut = () => {};
const configAxios = {
  baseURL: config.SUB_API,
  headers: {
    'Content-Type': 'application/json'
  }
};
const httpClient = axios.create(configAxios);

httpClient.interceptors.request.use(
  async (config) => {
    // if (localStorageHelper.isLogin()) {
    //   config.headers['Authorization'] = `Bearer ${localStorageHelper.getItem(LOCAL_STORE.TOKEN)}`;
    // }
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
          await signOut();
          window.location.href = '/welcome';
          return Promise.reject(error);

        case httpStatus.StatusForbidden:
          // window.location.href = '/403';
          toast.error('Bạn không có quyền truy cập vào server.');
          return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default httpClient;
