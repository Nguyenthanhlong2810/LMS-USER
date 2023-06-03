// /* eslint-disable no-useless-catch */
// import config from 'configs/axios/config';
// import { LOCAL_STORE, RESPONSE_STATUS } from 'consts/system.const';
// import { getWithExpiry } from 'utils';

// const responseConfig = async (response) => {
//   if (response.status === RESPONSE_STATUS.SUCESS) return await response.json();
//   throw response;
// };

// const postService = async (url, body, isAuthorization, isFormData) => {
//   try {
//     const headers = isFormData
//       ? { 'Content-Type': 'multipart/form-data' }
//       : { Accept: 'application/json', 'Content-Type': 'application/json' };
//     if (isAuthorization) headers.Authorization = `Bearer ${getWithExpiry(LOCAL_STORE.TOKEN)}`;
//     const requestInit = { method: 'POST', headers };
//     if (body)
//       if (isFormData) requestInit.body = body;
//       else requestInit.body = JSON.stringify(body);
//     const response = await fetch(`${config.HOST_API}/${url}`, requestInit);
//     return await responseConfig(response);
//   } catch (error) {
//     throw error;
//   }
// };

// const getService = async (url, params = null, isAuthorization = true) => {
//   try {
//     const headers = { Accept: 'application/json', 'Content-Type': 'application/json' };
//     if (isAuthorization) headers.Authorization = `Bearer ${getWithExpiry(LOCAL_STORE.TOKEN)}`;
//     const requestInit = { method: 'GET', headers };
//     let queryString = '';
//     if (params)
//       queryString = `?${Object.keys(params)
//         .map((key) => `${key}=${params[key] || ''}`)
//         .join('&')}`;
//     const response = await fetch(`${config.HOST_API}/${url}${queryString}`, requestInit);
//     return await responseConfig(response);
//   } catch (error) {
//     throw error;
//   }
// };

// export default { postService, getService };
