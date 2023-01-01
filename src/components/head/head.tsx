import { DefaultSeo } from 'next-seo';
import NextHead from 'next/head';
import type { FC } from 'react';
import { seo } from '@/config/config-seo';

export const Head: FC<{ locale?: string; url?: string }> = ({
  locale = 'en',
}) => {
  const { openGraph, ...seoData } = seo(locale);
  return (
    <>
      <DefaultSeo {...seoData} openGraph={{ ...openGraph, locale }} />
      <NextHead>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/site.webmanifest" key="site-manifest" />
      </NextHead>
    </>
  );
};
