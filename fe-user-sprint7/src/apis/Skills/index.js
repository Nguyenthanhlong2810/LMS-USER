import httpClient from 'configs/axios/http-client';

const BASE_URL = '/skills';

export const SkillsAPI = {
  getList: async (params) => {
    const data = await httpClient.get(`${BASE_URL}/all`, { params });
    return { data, totalRecords: data.data?.length };
  },
  filterAll: async (params) => {
    const data = await httpClient.get(`${BASE_URL}/filter-all`, { params });
    return { data, totalRecords: data.data?.length };
  }
};
