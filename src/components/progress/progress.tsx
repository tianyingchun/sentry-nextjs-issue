import { useNProgress } from '@tanem/react-nprogress';
import type { Router } from 'next/router';
import { useEffect, useState } from 'react';
import { Progress as LinearProgress } from 'react-daisyui';

export const Progress: React.FC<{
  router: Router;
}> = ({ router }) => {
  const [state, setState] = useState({
    isRouteChanging: false,
  });

  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating: state.isRouteChanging,
  });

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setState((prevState) => ({
        ...prevState,
        isRouteChanging: true,
      }));
    };

    const handleRouteChangeEnd = () => {
      setState((prevState) => ({
        ...prevState,
        isRouteChanging: false,
      }));
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeEnd);
    router.events.on('routeChangeError', handleRouteChangeEnd);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeEnd);
      router.events.off('routeChangeError', handleRouteChangeEnd);
    };
  }, [router.events]);
  return (
    <div
      style={{
        pointerEvents: 'none',
        opacity: isFinished ? 0 : 100,
        transition: `opacity ${animationDuration}ms linear`,
      }}
    >
      <div style={{ width: '100%', position: 'fixed', zIndex: 2000 }}>
        <LinearProgress value={String(progress * 100)} />
      </div>
    </div>
  );
};
