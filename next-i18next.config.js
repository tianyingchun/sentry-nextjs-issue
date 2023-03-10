const path = require('path');

const defaultLocale = 'en';
const debugI18n = ['true', 1].includes(
  process?.env?.NEXTJS_DEBUG_I18N ?? 'false'
);

/**
 * @type {import('next-i18next').UserConfig}
 */
module.exports = {
  i18n: {
    defaultLocale,
    locales: ['en', 'zh_Hans'],
  },
  saveMissing: false,
  strictMode: true,
  serializeConfig: false,
  returnObjects: false,
  reloadOnPrerender: process?.env?.NODE_ENV === 'development',
  react: {
    useSuspense: false,
  },
  fallbackLng: defaultLocale,
  debug: debugI18n,
  localePath:
    typeof window === 'undefined'
      ? path.resolve('./src/i18n/locales')
      : undefined,
};
