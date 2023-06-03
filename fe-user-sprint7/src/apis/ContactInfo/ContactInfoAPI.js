import httpClient from 'configs/axios/http-client';

const BASE_URL = '/contactInfo';

export const ContactInfoAPI = {
  getContactInfo: (params) => {
    return httpClient.get(BASE_URL, { params });
  }
};
