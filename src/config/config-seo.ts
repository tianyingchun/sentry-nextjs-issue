import type { DefaultSeoProps } from 'next-seo';

const seoBase: DefaultSeoProps = {
  titleTemplate: '%s | Bridge Demo',
};

const SEO_EN: DefaultSeoProps = {
  ...seoBase,
  title: 'Bridge Demo',
  description: 'Bridge Demo',
};

const SEO_ZH_HANS: DefaultSeoProps = {
  ...seoBase,
  title: 'Bridge Demo 文档系统',
  description: 'Bridge Demo 文档系统',
};

export const seo = (locale?: string) => {
  switch (locale) {
    case 'en':
      return SEO_EN;
    case 'zh_Hans':
      return SEO_ZH_HANS;
  }
  return SEO_EN;
};
