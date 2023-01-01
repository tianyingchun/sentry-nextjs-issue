import type { FC, PropsWithChildren } from 'react';
import { AppProvider } from './app';

export const AppProviders: FC<PropsWithChildren> = ({ children }) => {
  return <AppProvider>{children}</AppProvider>;
};
