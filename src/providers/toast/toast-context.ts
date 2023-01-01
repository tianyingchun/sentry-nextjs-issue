import { createCtx } from '@wove/react';
import type { ReactNode } from 'react';
export type TostMessageType = 'info' | 'success' | 'warning' | 'error';

type Horizontal = 'start' | 'center' | 'end' | undefined;
type Vertical = 'top' | 'middle' | 'bottom' | undefined;
type VariantKeys =
  | 'top_left'
  | 'top_right'
  | 'bottom_right'
  | 'bottom_left'
  | 'top_middle'
  | 'bottom_middle'
  | 'undefined';
export const VARIANTS: Record<
  VariantKeys,
  { horizontal: Horizontal; vertical: Vertical }
> = {
  top_left: {
    horizontal: 'start',
    vertical: 'top',
  },
  top_right: {
    horizontal: 'end',
    vertical: 'top',
  },
  bottom_right: {
    horizontal: 'end',
    vertical: 'bottom',
  },
  bottom_left: {
    horizontal: 'start',
    vertical: 'bottom',
  },
  top_middle: {
    horizontal: 'center',
    vertical: 'top',
  },
  bottom_middle: {
    horizontal: 'center',
    vertical: 'bottom',
  },
  undefined: {
    horizontal: 'start',
    vertical: 'top',
  },
};

export type Toast = {
  id: string;
  type?: TostMessageType;
  header?: string;
  lifetime: number;
  message: string | ReactNode;
};

export type ToastContextType = {
  data: Array<Toast>;
  setVariant(variant: keyof typeof VARIANTS): void;
  pushError(message: string, lifetime?: number): void;
  pushWarning(message: string, lifetime?: number): void;
  pushSuccess(message: string, lifetime?: number): void;
  pushInfo(message: string, lifetime?: number): void;
  push(message: string, type: TostMessageType, lifetime?: number): void;
  pushCustom(message: string | ReactNode, lifetime?: number): void;
  remove(id: string): void;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const [useToast, ToastContextProvider] =
  createCtx<ToastContextType>('ToastContext');
