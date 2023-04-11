import '@/styles/variables.scss';
import '@/styles/mixins.scss';
import '@/styles/index.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { UserDataProvider } from '@/pages/context/UserDataContext';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Everything Shop</title>
			</Head>
			<UserDataProvider>
				<Component {...pageProps} />
			</UserDataProvider>
		</>
	);
}
