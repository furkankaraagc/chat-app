import userSlice from '@/redux/features/userSlice';
import { configureStore } from '@reduxjs/toolkit';
import chatSlice from './features/chatSlice';

export const store = configureStore({
  reducer: {
    userSlice,
    chatSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
