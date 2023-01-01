/* eslint-disable @typescript-eslint/no-explicit-any */
import { hooks } from '@wove/react';
import { useRouter } from 'next/router';
import Script from 'next/script';
import type { FC } from 'react';
import { useEffect } from 'react';

type FacebookPixelProps = {
  pixelMeasurementId?: string;
  enableFbPixel?: boolean;
};

/**
 * Facebook 像素代码加载文件.
 * https://developers.facebook.com/docs/meta-pixel/implementation/conversion-tracking
 */
export const FacebookPixel: FC<FacebookPixelProps> = ({
  pixelMeasurementId,
  enableFbPixel = false,
}) => {
  const newerPixelMeasurementId =
    process.env.NEXT_PUBLIC_PIXEL_MEASUREMENT_ID ?? pixelMeasurementId;

  const router = useRouter();

  const handleRouteChange = hooks.useCallbackRef(() => {
    if ((window as any)['fbq']) {
      (window as any)['fbq']('track', 'PageView');
    }
  });

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [handleRouteChange, router.events]);

  if (!newerPixelMeasurementId || !enableFbPixel) {
    return null;
  }

  return (
    <Script id="fb-pixel-scripts" strategy="afterInteractive">
      {`!function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${newerPixelMeasurementId}');
          `}
    </Script>
  );
};
