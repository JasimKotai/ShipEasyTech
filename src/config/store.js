import { configureStore } from '@reduxjs/toolkit';
import UserSlice from './UserSlice';

export default store = configureStore({
  reducer: { userSlice: UserSlice },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});
