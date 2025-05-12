import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NewsCategory } from '@/types';

interface SubscriptionState {
  categories: NewsCategory[];
  isSubscribed: boolean;
}

const initialState: SubscriptionState = {
  categories: ['Technology', 'Business'],
  isSubscribed: false,
};

const subscriptionSlice = createSlice({
  name: 'subscriptions',
  initialState,
  reducers: {
    subscribe: (state, action: PayloadAction<NewsCategory>) => {
      if (!state.categories.includes(action.payload)) {
        state.categories.push(action.payload);
      }
    },
    unsubscribe: (state, action: PayloadAction<NewsCategory>) => {
      state.categories = state.categories.filter(
        (category) => category !== action.payload
      );
    },
    setCategories: (state, action: PayloadAction<NewsCategory[]>) => {
      state.categories = action.payload;
    },
    setSubscriptionStatus: (state, action: PayloadAction<boolean>) => {
      state.isSubscribed = action.payload;
    },
  },
});

export const { subscribe, unsubscribe, setCategories, setSubscriptionStatus } =
  subscriptionSlice.actions;

export default subscriptionSlice.reducer;