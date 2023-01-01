import { createCtx } from '@wove/react';
import type { DataTheme } from 'react-daisyui/dist/types';

export type AppCtxState = {
  theme: DataTheme;
};

export type AppCtxStateSetter = {
  setTheme: (theme: DataTheme) => void;
};

type AppCtx = AppCtxState & AppCtxStateSetter;

export const [useApp, AppContextProvider] = createCtx<AppCtx>('AppContext');
