/* Author: Dalibor Kundrat  https://github.com/damikun */

import { hooks } from '@wove/react';
import type { FC, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import type { ToastContainerProps } from './toast-container';
import { ToastContainer } from './toast-container';
import type {
  Toast,
  ToastContextType,
  TostMessageType,
  VARIANTS,
} from './toast-context';
import { ToastContextProvider } from './toast-context';

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const DEFAULTINTERVAL = 2500;

export type ToastProviderProps = {
  children: ReactNode;
} & ToastContainerProps;

export const ToastProvider: FC<ToastProviderProps> = ({
  children,
  variant,
}) => {
  const [variantNow, setVariant] = useState<keyof typeof VARIANTS>(
    variant || 'top_right'
  );

  const [data, setData] = useState<Array<Toast>>([]);

  const push = hooks.useCallbackRef(
    (message: string, type: TostMessageType, lifetime?: number) => {
      if (message) {
        const newItem: Toast = {
          type,
          message,
          id: uuidv4(),
          lifetime: lifetime ? lifetime : DEFAULTINTERVAL,
        };

        setData([...data, newItem]);
      }
    }
  );

  const pushCustom = hooks.useCallbackRef(
    (message: string | ReactNode, lifetime?: number) => {
      if (message) {
        const newItem: Toast = {
          type: undefined,
          message,
          id: uuidv4(),
          lifetime: lifetime ?? DEFAULTINTERVAL,
        };
        setData([...data, newItem]);
      }
    }
  );

  const pushInfo = hooks.useCallbackRef((message: string, lifetime?: number) =>
    push(message, 'info', lifetime)
  );

  const pushError = hooks.useCallbackRef((message: string, lifetime?: number) =>
    push(message, 'error', lifetime)
  );

  const pushWarning = hooks.useCallbackRef(
    (message: string, lifetime?: number) => push(message, 'warning', lifetime)
  );

  const pushSuccess = hooks.useCallbackRef(
    (message: string, lifetime?: number) => push(message, 'success', lifetime)
  );

  const remove = hooks.useCallbackRef(async (id: string) => {
    const newData = data.filter((e) => e.id !== id);
    setData(newData);
  });

  const contextValue: ToastContextType = {
    data,
    push,
    pushInfo,
    pushError,
    pushWarning,
    pushSuccess,
    pushCustom,
    remove,
    setVariant,
  };

  useEffect(() => {
    if (variant) {
      setVariant(variant);
    }
  }, [variant]);

  return (
    <ToastContextProvider value={contextValue}>
      <ToastContainer variant={variantNow} />
      {children}
    </ToastContextProvider>
  );
};
