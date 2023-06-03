import httpClient from 'configs/axios/http-client';

const BASE_URL = '/users';

export const UserAPI = {
  getUserById: (id) => {
    return httpClient.get(`${BASE_URL}/user/${id}`);
  }
};
