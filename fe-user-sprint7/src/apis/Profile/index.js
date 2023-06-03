import httpClient from 'configs/axios/http-client';

export const UserApi = {
  getProfile: async (id = '') => {
    try {
      const result = await httpClient.get('/users/user/' + id);
      return result.data;
    } catch (err) {
      throw err;
    }
  },
  updateProfile: async (username, data, fileAvatar) => {
    try {
      const formData = new FormData();
      if (fileAvatar) {
        formData.append('file', fileAvatar);
      }
      delete data.avatar;
      formData.append('appUser', JSON.stringify({ username, ...data }));

      const result = await httpClient.put('/users/update', formData);
      return result.data;
    } catch (err) {
      throw err;
    }
  },
  getCurrentUser: () => {
    try {
      return httpClient.get('/users/me');
    } catch (err) {
      throw err;
    }
  },
  signin: (user) => {
    try {
      return httpClient.post('/users/signin', user);
    } catch (err) {
      throw err;
    }
  }
};
