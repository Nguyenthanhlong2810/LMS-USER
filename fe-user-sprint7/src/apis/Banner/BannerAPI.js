import httpClient from 'configs/axios/http-client';

const BASE_URL = '/banner';

export const BannerAPI = {
  getBanner: () => {
    return httpClient.get(`${BASE_URL}`);
  }
};
