import httpClient from 'configs/axios/http-client';

export const PublicApi = {
  getIntroLandingPage: (params) => {
    return httpClient.get('/admin/landing-page', { params });
  }
};
