import { createContext } from 'react';
import { LabelProps } from './Label';

export type Configuration = {
  repository: string;
  token: string;
};

type ConfigurationContextShape = Configuration & { labels?: LabelProps[] };

export const ConfigurationContext = createContext<ConfigurationContextShape>(
  {} as ConfigurationContextShape
);
