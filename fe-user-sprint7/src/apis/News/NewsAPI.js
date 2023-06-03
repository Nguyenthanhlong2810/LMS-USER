import httpClient from 'configs/axios/http-client';

const BASE_URL = '/news';

export const NewsAPI = {
  getAllNews: (params) => {
    return httpClient.get(BASE_URL + '/list', { params });
  },
  getNewsDetail: async (id) => {
    return httpClient.get(BASE_URL + `/${id}`);
  },
  getHotNews: (params) => {
    return httpClient.get(BASE_URL + '/hot-news', { params });
  }
};
