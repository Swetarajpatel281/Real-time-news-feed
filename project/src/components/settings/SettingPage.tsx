import React, { useState } from 'react';
import { Save, Moon, Sun, Bell, BellOff, User, LogOut } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { updateSettings, resetSettings } from '../../store/slices/settingSlice';
import { logout } from '../../store/slices/authSlice';
import SettingsSection from './SettingsSection';
import ToggleSwitch from '../ui/toggleSwitch';
import {Button} from '../ui/button';

const SettingsPage: React.FC = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.settings);
  const user = useSelector((state: RootState) => state.auth.user);
  
  const [localSettings, setLocalSettings] = useState(settings);
  const [activeTab, setActiveTab] = useState<'appearance' | 'notifications' | 'account'>('appearance');

  const handleChange = (key: string, value: any) => {
    setLocalSettings({
      ...localSettings,
      [key]: value
    });
  };

  const handleSave = () => {
    dispatch(updateSettings(localSettings));
  };

  const handleLogout = () => {
    // Optional: Show confirmation dialog
    if (window.confirm('Are you sure you want to log out?')) {
      dispatch(logout());
      // Navigate to login page
      window.location.href = '/login';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden transition-colors duration-200">
          <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700">
              <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage your account and preferences</p>
              </div>
              <nav className="flex md:flex-col">
                <button
                  onClick={() => setActiveTab('appearance')}
                  className={`flex items-center px-6 py-3 text-sm font-medium w-full text-left ${
                    activeTab === 'appearance' 
                      ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400 border-l-4 border-blue-600 dark:border-blue-400' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/30'
                  }`}
                >
                  {activeTab === 'appearance' ? <Sun className="w-5 h-5 mr-2" /> : <Moon className="w-5 h-5 mr-2" />}
                  Appearance
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`flex items-center px-6 py-3 text-sm font-medium w-full text-left ${
                    activeTab === 'notifications' 
                      ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400 border-l-4 border-blue-600 dark:border-blue-400' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/30'
                  }`}
                >
                  {activeTab === 'notifications' ? <Bell className="w-5 h-5 mr-2" /> : <BellOff className="w-5 h-5 mr-2" />}
                  Notifications
                </button>
                <button
                  onClick={() => setActiveTab('account')}
                  className={`flex items-center px-6 py-3 text-sm font-medium w-full text-left ${
                    activeTab === 'account' 
                      ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400 border-l-4 border-blue-600 dark:border-blue-400' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/30'
                  }`}
                >
                  <User className="w-5 h-5 mr-2" />
                  Account
                </button>
              </nav>
            </div>

            {/* Main content */}
            <div className="flex-1 p-6">
              {activeTab === 'appearance' && (
                <SettingsSection title="Appearance">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">Dark Mode</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Toggle between light and dark theme</p>
                      </div>
                      <ToggleSwitch 
                        checked={localSettings.darkMode}
                        onChange={(value) => handleChange('darkMode', value)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">Compact View</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Display more content with less spacing</p>
                      </div>
                      <ToggleSwitch 
                        checked={localSettings.compactView}
                        onChange={(value) => handleChange('compactView', value)}
                      />
                    </div>
                  </div>
                </SettingsSection>
              )}

              {activeTab === 'notifications' && (
                <SettingsSection title="Notifications">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">Push Notifications</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Receive updates for breaking news</p>
                      </div>
                      <ToggleSwitch 
                        checked={localSettings.pushNotifications}
                        onChange={(value) => handleChange('pushNotifications', value)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">Email Digests</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Receive daily summaries via email</p>
                      </div>
                      <ToggleSwitch 
                        checked={localSettings.emailDigests}
                        onChange={(value) => handleChange('emailDigests', value)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">News Alerts</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Get notified for new articles in your subscribed categories</p>
                      </div>
                      <ToggleSwitch 
                        checked={localSettings.newsAlerts}
                        onChange={(value) => handleChange('newsAlerts', value)}
                      />
                    </div>
                  </div>
                </SettingsSection>
              )}

              {activeTab === 'account' && (
                <SettingsSection title="Account">
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                      <input
                        type="text"
                        id="name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        value={user?.name || ''}
                        readOnly
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                      <input
                        type="email"
                        id="email"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        value={user?.email || ''}
                        readOnly
                      />
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={handleLogout}
                        className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Log Out
                      </button>
                    </div>
                  </div>
                </SettingsSection>
              )}

              <div className="mt-6 flex justify-end space-x-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                <button
                  onClick={() => dispatch(resetSettings())}
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  Reset to Default
                </button>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;