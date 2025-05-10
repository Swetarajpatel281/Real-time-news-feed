import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SettingsState {
  darkMode: boolean;
  compactView: boolean;
  pushNotifications: boolean;
  emailDigests: boolean;
  newsAlerts: boolean;
  preferredCategories: string[];
}

// Load settings from localStorage if available
const loadSettings = (): SettingsState => {
  try {
    const savedSettings = localStorage.getItem('newsapp_settings');
    if (savedSettings) {
      return JSON.parse(savedSettings);
    }
  } catch (error) {
    console.error('Failed to load settings from localStorage:', error);
  }
  
  // Default settings
  return {
    darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
    compactView: false,
    pushNotifications: true,
    emailDigests: false,
    newsAlerts: true,
    preferredCategories: [],
  };
};

const initialState: SettingsState = loadSettings();

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateSettings: (state, action: PayloadAction<Partial<SettingsState>>) => {
      const newState = { ...state, ...action.payload };
      
      // Save to localStorage
      try {
        localStorage.setItem('newsapp_settings', JSON.stringify(newState));
      } catch (error) {
        console.error('Failed to save settings to localStorage:', error);
      }
      
      return newState;
    },
    resetSettings: () => {
      const defaultSettings: SettingsState = {
        darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
        compactView: false,
        pushNotifications: true,
        emailDigests: false,
        newsAlerts: true,
        preferredCategories: [],
      };
      
      // Save to localStorage
      try {
        localStorage.setItem('newsapp_settings', JSON.stringify(defaultSettings));
      } catch (error) {
        console.error('Failed to save settings to localStorage:', error);
      }
      
      return defaultSettings;
    },
    updatePreferredCategories: (state, action: PayloadAction<string[]>) => {
      state.preferredCategories = action.payload;
      
      // Save to localStorage
      try {
        localStorage.setItem('newsapp_settings', JSON.stringify(state));
      } catch (error) {
        console.error('Failed to save settings to localStorage:', error);
      }
    },
  },
});

export const { updateSettings, resetSettings, updatePreferredCategories } = settingsSlice.actions;
export default settingsSlice.reducer;