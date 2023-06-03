import httpClient from 'configs/axios/http-client';

const USER_URL = 'users/adminInfo';
export const getAdminInfo = () => {
  try {
    return httpClient.get(USER_URL);
  } catch (err) {
    console.error(err);
  }
  // return Promise.resolve(MOCK_ADMIN_INFO);
};

export const updateAccountIntro = async () => {
  try {
    return await httpClient.post(USER_URL);
  } catch (err) {
    console.error(err);
  }
  // return Promise.resolve(MOCK_ADMIN_INFO);
};

export const getAccountIntroductionSetting = () => {
  return httpClient.get('/admin/admin-setting-first-login');
};

export const setUserFirstLogin = async (data) => {
  try {
    return await httpClient.post('/users/set-user-first-login', data);
  } catch (error) {
    console.log(err);
  }
};
