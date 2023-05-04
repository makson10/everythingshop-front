import '@/styles/variables.scss';
import '@/styles/mixins.scss';
import '@/styles/index.scss';
import '@/styles/globals.scss';
import '@/styles/formInput.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { UserDataProvider } from '@/pages/context/UserDataContext';
import { CartProvider } from './context/CartContext';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Everything Shop</title>
			</Head>
			<CartProvider>
				<UserDataProvider>
					<Component {...pageProps} />
				</UserDataProvider>
			</CartProvider>
		</>
	);
}
