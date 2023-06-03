import landingSlice from './landingSlice';
import userState from './userSlice';
import courseDetailSlice from './courseDetailSlice';

const rootReducers = {
  user: userState,
  landing: landingSlice,
  courseDetail: courseDetailSlice
};

export default rootReducers;
