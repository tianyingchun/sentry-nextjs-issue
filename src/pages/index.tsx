import { str } from '@dimjs/utils';
import { hooks } from '@wove/react';
import Image from 'next/image';
import { Button } from 'react-daisyui';
import { useApp, useToast } from '../providers';
import styles from './page.module.css';

/**
 * Seed to the random number generation algorithm
 * @param max 3
 * @returns expected output: 0, 1 or 2
 */
function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export default function Home() {
  const { setTheme, theme } = useApp();
  const handleClick = hooks.useCallbackRef(() => {
    const themes = [
      'light',
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'acid',
      'lemonade',
      'night',
      'coffee',
      'winter',
    ];
    const randomTheme = getRandomInt(themes.length);
    setTheme(themes[randomTheme]);
  });

  const toast = useToast();
  const handleToastClick = hooks.useCallbackRef(() => {
    toast.pushError('This is an error message, ID: ' + getRandomInt(100));
  });

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js 13!</a>
        </h1>
        <p className={'text-4xl font-bold text-tahiti-600'}>
          {str.capitalize('Tailwind css sample')}
        </p>
        <p>
          <Button size="sm" onClick={handleClick}>
            Change Theme ({theme})
          </Button>
        </p>
        <p className="mt-2">
          <Button size="sm" onClick={handleToastClick}>
            Show Toast
          </Button>
        </p>
        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>app/page.tsx</code>
        </p>

        <div className={styles.grid}>
          <a href="https://beta.nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js 13</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Explore the Next.js 13 playground.</p>
          </a>

          <a
            href="https://vercel.com/templates/next.js/app-directory?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>Deploy your Next.js site to a public URL with Vercel.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
