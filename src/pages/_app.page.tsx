import { UserDataProvider } from '@/context/UserDataContext';
import { CartProvider } from '@/context/CartContext';
import { ThemeProvider } from '@/context/ThemeContext';
import '@/styles/variables.scss';
import '@/styles/index.scss';
import '@/styles/globals.scss';
import 'swiper/css/bundle';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Everything Shop</title>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Head>
			<UserDataProvider>
				<CartProvider>
					<ThemeProvider>
						<Component {...pageProps} />
					</ThemeProvider>
				</CartProvider>
			</UserDataProvider>
		</>
	);
}
