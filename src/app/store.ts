import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../app/features/userSlice'; // Make sure this path is correct

const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;