import type { FC, PropsWithChildren } from 'react';
import { useMemo, useReducer } from 'react';
import { Theme } from 'react-daisyui';
import type { DataTheme } from 'react-daisyui/dist/types';
import { ToastProvider } from '../toast/toast-provider';
import type { AppCtxState, AppCtxStateSetter } from './app-context';
import { AppContextProvider } from './app-context';

const initialState: AppCtxState = {
  theme: 'light',
};

type AppCtxAction = {
  type: 'SET_COLOR_THEME';
  theme: DataTheme;
};

function appReducer(state: AppCtxState, action: AppCtxAction): AppCtxState {
  if (action.type === 'SET_COLOR_THEME') {
    return {
      ...state,
      theme: action.theme,
    };
  }
  return state;
}

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const stateSetter: AppCtxStateSetter = useMemo(
    () => ({
      setTheme: (theme) => {
        if (theme) {
          return dispatch({ type: 'SET_COLOR_THEME', theme });
        }
      },
    }),
    []
  );

  const value = useMemo(
    () => ({
      ...state,
      ...stateSetter,
    }),
    [state, stateSetter]
  );

  return (
    <AppContextProvider value={value}>
      <Theme dataTheme={value.theme}>
        <ToastProvider variant={'top_right'}>{children}</ToastProvider>
      </Theme>
    </AppContextProvider>
  );
};
