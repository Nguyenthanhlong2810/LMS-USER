import httpClient from 'configs/axios/http-client';

export const FAQApi = {
  getListTopic: async (params) => {
    return httpClient.get('/topic', { params });
  },
  getListFAQ: async (params) => {
    return httpClient.get('/topic/question', { params });
  }
};
