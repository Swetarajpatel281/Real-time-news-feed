import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './slices/settingSlice';
import authReducer from './slices/authSlice';
// Import other reducers you might have
// import newsReducer from './slices/newsSlice';
// import categoryReducer from './slices/categorySlice';

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    auth: authReducer,
    // Add other reducers here
    // news: newsReducer,
    // categories: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

