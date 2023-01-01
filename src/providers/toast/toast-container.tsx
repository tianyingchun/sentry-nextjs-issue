import { hooks } from '@wove/react';
import type { FC, PropsWithChildren } from 'react';
import { Alert, Toast } from 'react-daisyui';
import { useToast, VARIANTS } from './toast-context';

export type ToastContainerProps = {
  variant?: keyof typeof VARIANTS;
};

const Timer: FC<
  PropsWithChildren<{ onRemove: () => void; lifeTime: number }>
> = ({ children, onRemove, lifeTime }) => {
  hooks.useTimeout(onRemove, lifeTime);
  return <>{children}</>;
};

export const ToastContainer: FC<ToastContainerProps> = ({
  variant = 'top_right',
}) => {
  const context = useToast();

  const varItem = VARIANTS[variant] || VARIANTS.top_right;

  const handleRemove = hooks.useCallbackRef((id: string) => {
    context?.remove(id);
  });

  return (
    <Toast vertical={varItem.vertical} horizontal={varItem.horizontal}>
      {context?.data.map((toast) => {
        const handleClose = () => {
          handleRemove(toast.id);
        };
        return (
          <Timer
            key={toast.id}
            lifeTime={toast.lifetime}
            onRemove={handleClose}
          >
            <Alert
              status={toast.type}
              icon={
                <svg
                  onClick={handleClose}
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="mx-2 h-6 w-6 stroke-current"
                >
                  <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                </svg>
              }
            >
              {toast.message}
            </Alert>
          </Timer>
        );
      })}
    </Toast>
  );
};
