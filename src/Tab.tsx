import React from 'react';
import { TabContent } from './components/TabContent';

interface TabProps {
  active: boolean;
}

export const Tab: React.FC<TabProps> = ({ active }) => {
  return active ? <TabContent /> : null;
};
