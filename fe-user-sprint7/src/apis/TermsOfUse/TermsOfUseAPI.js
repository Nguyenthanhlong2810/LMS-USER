import httpClient from 'configs/axios/http-client';

const BASE_URL = '/terms';

export const TermsAPI = {
  getTermsOfUse: (params) => {
    return httpClient.get(BASE_URL, { params });
  }
};
