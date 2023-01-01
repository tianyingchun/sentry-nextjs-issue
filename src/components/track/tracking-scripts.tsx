import type { FC } from 'react';
import { FacebookPixel } from './facebook';
import { geFacebookPixelTrackingId } from './tracking-measurement-id';

type TrackingScriptProps = {
  locale: string;
  enableGaAds?: boolean;
  enableFbPixel?: boolean;
};

/**
 * 包含google 分析, 广告联合的页面级加载代码
 * https://developers.google.cn/tag-platform/gtagjs/reference?hl=zh-cn
 */
export const TrackingScripts: FC<TrackingScriptProps> = ({
  locale,
  enableFbPixel = true,
}) => {
  // FB pixel
  const fbTrackingId = geFacebookPixelTrackingId(locale);

  return (
    <>
      {/* Global site tag (gtag.js) - Google Ads: 1000113386 */}
      <FacebookPixel
        enableFbPixel={enableFbPixel}
        pixelMeasurementId={fbTrackingId}
      />
    </>
  );
};
