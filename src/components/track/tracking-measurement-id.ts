/**
 * 根据locale 获取Facebook Pixel
 * @param locale
 * @returns
 */
export const geFacebookPixelTrackingId = (locale: string) => {
  let trackingId = process.env.NEXT_PUBLIC_FB_TRACKING_ID_EN;
  switch (locale) {
    case 'en_GB':
      trackingId = process.env.NEXT_PUBLIC_FB_TRACKING_ID_EN_GB;
      break;
    case 'de':
      trackingId = process.env.NEXT_PUBLIC_FB_TRACKING_ID_DE;
      break;
    case 'es':
      trackingId = process.env.NEXT_PUBLIC_FB_TRACKING_ID_ES;
      break;
  }
  return trackingId || '';
};
