import { CartProvider } from '@/context/CartContext';
import { ThemeProvider } from '@/context/ThemeContext';
import '@/styles/variables.scss';
import '@/styles/index.scss';
import '@/styles/globals.scss';
import 'swiper/css/bundle';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import StoreProvider from '@/store/StoreProvider';

// TODO:
//? check on bugs
//? add nomemon to server
//? fix undef bug in jwt login
//? add slices for another context

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Everything Shop</title>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Head>
			<StoreProvider>
				<CartProvider>
					<ThemeProvider>
						<Component {...pageProps} />
					</ThemeProvider>
				</CartProvider>
			</StoreProvider>
		</>
	);
}
