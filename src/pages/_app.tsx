import '@/styles/globals.css';
import '@/styles/tailwind.css';
import type { PagePropsResultBaseData } from 'next';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import type { FC, PropsWithChildren } from 'react';
import { useEffect } from 'react';
import { Head } from '@/components/head';
import { Progress } from '@/components/progress';
import { defaultDomain } from '@/config/config-domain';
import nextI18nextConfig from '../../next-i18next.config';
import { TrackingScripts } from '../components/track';
import { AppProviders } from '../providers';

const Noop: FC<PropsWithChildren> = ({ children }) => <>{children}</>;
const KzfooApp: FC<AppProps<PagePropsResultBaseData>> = ({
  Component,
  pageProps,
  router,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Layout = (Component as any)['Layout'] || Noop;

  // current locale.
  const locale = (pageProps.locale || router.locale || 'en') as string;

  const domainLocale = (router.domainLocales || []).find(
    (s) => s.defaultLocale === locale
  );

  const domainName = domainLocale ? domainLocale.domain : defaultDomain;
  const domain = `https://${domainName.replace(/(?:https|http)?:\/\//, '')}`;
  // 针对分类页面, 顶部的navbar不跟随滚动条拖动, 自动显示/隐藏.
  const navbarHideOnScroll = !router.asPath.startsWith('/catalog');

  useEffect(() => {
    /**
     * Chrome has a bug with transitions on load since 2012!
     * To prevent a "pop" of content, you have to disable all transitions until
     * the page is done loading.
     */
    document.body.classList?.remove('loading');
  }, []);

  return (
    <>
      <TrackingScripts locale={locale} />
      <AppProviders>
        <Head locale={locale} url={domain} />
        <Progress router={router} />
        <Layout
          navbarHideOnScroll={navbarHideOnScroll}
          pageProps={{ ...pageProps, locale, domain }}
        >
          <Component {...pageProps} locale={locale} domain={domain} />
        </Layout>
      </AppProviders>
    </>
  );
};

export default appWithTranslation<AppProps<PagePropsResultBaseData>>(KzfooApp, {
  ...nextI18nextConfig,
});
