import React, { ReactNode } from 'react';

interface SettingsSectionProps {
  title: string;
  children: ReactNode;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, children }) => {
  return (
    <div className="animate-fadeIn">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{title}</h2>
      {children}
    </div>
  );
};

export default SettingsSection;