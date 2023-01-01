import type { FC, ReactNode } from 'react';
import { AppProviders } from '@/providers';
import { I18nextTestStubProvider } from './i18next-stub.config';

export const AppTestProviders: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AppProviders>
      <I18nextTestStubProvider>{children}</I18nextTestStubProvider>
    </AppProviders>
  );
};
