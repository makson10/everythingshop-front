import '@/styles/variables.scss';
import '@/styles/mixins.scss';
import '@/styles/index.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
            <Head>
				<title>Everything Shop</title>
			</Head>
			<Component {...pageProps} />
		</>
	);
}
