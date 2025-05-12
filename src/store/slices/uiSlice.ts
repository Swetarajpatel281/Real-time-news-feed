import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NewsCategory } from '@/types';

interface UiState {
  currentCategory: NewsCategory | 'All';
  sidebarOpen: boolean;
  searchQuery: string;
  notificationCount: number;
}

const initialState: UiState = {
  currentCategory: 'All',
  sidebarOpen: false,
  searchQuery: '',
  notificationCount: 0,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrentCategory: (state, action: PayloadAction<NewsCategory | 'All'>) => {
      state.currentCategory = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    incrementNotificationCount: (state) => {
      state.notificationCount += 1;
    },
    resetNotificationCount: (state) => {
      state.notificationCount = 0;
    },
  },
});

export const {
  setCurrentCategory,
  toggleSidebar,
  setSidebarOpen,
  setSearchQuery,
  incrementNotificationCount,
  resetNotificationCount,
} = uiSlice.actions;

export default uiSlice.reducer;