export const defaultDomain = `https://www.nailip.com`;
/**
 * Note 此处的domain不能带有https://
 */
export const allDomains = [
  {
    name: 'United States',
    domain: process.env.NEXT_PUBLIC_EN_DOMAIN || 'www.nailip.com',
    // https://flagcdn.com/w40/us.png
    code: 'us',
    defaultLocale: 'en',
    locales: ['en_AU', 'en_CA', 'en_US'],
  },
  {
    name: 'Chinese',
    domain: 'www.nailip.cn',
    defaultLocale: 'zh_Hans',
    // https://flagcdn.com/w40/gb.png
    code: 'zh',
    // specify other locales that should be redirected
    // to this domain
    locales: ['zh_Hans'],
  },
];
