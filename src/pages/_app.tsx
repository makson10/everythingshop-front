import '@/styles/index.scss';
import '@/styles/mixins.scss';
import '@/styles/variables.scss';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
