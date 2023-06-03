import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserApi } from 'apis/Profile';

export const fetchLogin = createAsyncThunk('user/signin', async (user, thunkAPI) => {
  try {
    const result = await UserApi.signin(user);
    return result.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const fetchUser = createAsyncThunk('user/me', async (user, thunkAPI) => {
  try {
    const result = await UserApi.getCurrentUser();
    return result;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// const test = () => {
//   return new Promise((resolve) =>
//     setTimeout(() => {
//       console.log('timeout2s');
//       resolve();
//     }, 2000)
//   );
// };
