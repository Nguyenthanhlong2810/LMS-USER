import { createSlice } from '@reduxjs/toolkit';
import { LOCAL_STORE, RESPONSE_STATUS } from 'consts/system.const';
import { localStorageHelper } from 'helpers';
import { setWithExpiry } from 'utils';
import { fetchLogin, fetchUser } from '../thunk/userThunk';

export const initialState = {
  token: null,
  username: null,
  email: null,
  avatar: null,
  id: null,
  roles: [],
  firstLoginSetup: false,
  fullname: null
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    signOut: () => {
      localStorageHelper.removeItem(LOCAL_STORE.TOKEN);
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload.token) {
          state.token = payload.token;
          setWithExpiry(LOCAL_STORE.TOKEN, payload.token);
        } else throw Error({ message: 'Login fail!', status: RESPONSE_STATUS.UNAUTHORIZED });
      })
      .addCase(fetchLogin.rejected, (_state, action) => {
        throw { message: action.payload?.message };
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        const payload = action.payload.data;
        state.fullname = payload.fullname;
        state.email = payload.email;
        state.username = payload.username;
        state.id = payload.id;
        state.roles = payload.appUserRoles;
        state.firstLoginSetup = payload.firstLoginSetup;
      })
      .addCase(fetchUser.rejected, (_state, action) => {
        throw action.payload;
      });
  }
});

export const { signOut } = userSlice.actions;

export default userSlice.reducer;
