import httpClient from 'configs/axios/http-client';

const BASE_URL = '/category';

export const CategoryTrainingAPI = {
  get: () => {
    return httpClient.get(`${BASE_URL}`, { params: { language: 'vn', pageNo: 1, pageSize: 100 } });
  },
  getList: async (params) => {
    const data = await httpClient.get(BASE_URL, {
      params
    });
    return { data, totalRecords: data.data?.totalRecords };
  },
  filterAll: async (params) => {
    const data = await httpClient.get(`${BASE_URL}/filter-all`, { params });
    return { data, totalRecords: data.data?.totalRecords };
  },
  getMenuInternal: () => {
    return httpClient.get(BASE_URL + '/menu-internal');
  }
};
