import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  landingPageData: {
    feedbacks: [],
    landingPageSetting: {},
    titleLandingPages: []
  }
};

export const landingSlice = createSlice({
  name: 'landing',
  initialState,
  reducers: {
    setLandingState: (state, action) => {
      state.landingPageData = action.payload;
    }
  }
});

export const { setLandingState } = landingSlice.actions;

export default landingSlice.reducer;
